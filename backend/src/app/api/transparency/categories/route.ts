import { TransparencyStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { handleError, ok, preflight } from "@/lib/http/response";
import { normalizeQueryParams } from "@/lib/validators/common";
import { transparencyCategoryListQuerySchema } from "@/lib/validators/transparency";

export async function OPTIONS(request: Request) {
  return preflight(request, "GET,OPTIONS");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = transparencyCategoryListQuerySchema.parse(
      normalizeQueryParams({
        q: searchParams.get("q") ?? undefined,
      }),
    );

    const where = query.q
      ? {
          isActive: true,
          OR: [
            { title: { contains: query.q, mode: "insensitive" as const } },
            { description: { contains: query.q, mode: "insensitive" as const } },
          ],
        }
      : { isActive: true };

    const [categories, counts] = await Promise.all([
      prisma.transparencyCategory.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          parentId: true,
          sortOrder: true,
          isActive: true,
          parent: {
            select: {
              id: true,
              slug: true,
              title: true,
            },
          },
        },
      }),
      prisma.transparencyItem.groupBy({
        by: ["categoryId"],
        where: {
          status: TransparencyStatus.PUBLISHED,
          category: {
            is: {
              isActive: true,
            },
          },
        },
        _count: {
          _all: true,
        },
      }),
    ]);

    const countByCategoryId = new Map(counts.map((entry) => [entry.categoryId, entry._count._all]));

    const data = categories.map((category) => ({
      ...category,
      publishedItemCount: countByCategoryId.get(category.id) ?? 0,
    }));

    return ok(request, {
      data,
      meta: {
        page: 1,
        pageSize: data.length,
        total: data.length,
        totalPages: Math.ceil(data.length / (data.length || 1)),
      },
    });
  } catch (error) {
    return handleError(request, error);
  }
}

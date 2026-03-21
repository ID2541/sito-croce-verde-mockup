import { TransparencyStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { handleError, ok, preflight } from "@/lib/http/response";
import { normalizeQueryParams } from "@/lib/validators/common";
import { transparencyItemListQuerySchema } from "@/lib/validators/transparency";

export async function OPTIONS(request: Request) {
  return preflight(request, "GET,OPTIONS");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = transparencyItemListQuerySchema.parse(
      normalizeQueryParams({
        q: searchParams.get("q") ?? undefined,
        categorySlug: searchParams.get("categorySlug") ?? undefined,
        year: searchParams.get("year") ?? undefined,
        page: searchParams.get("page") ?? undefined,
        pageSize: searchParams.get("pageSize") ?? undefined,
      }),
    );

    const where = {
      status: TransparencyStatus.PUBLISHED,
      category: {
        is: {
          isActive: true,
          ...(query.categorySlug ? { slug: query.categorySlug } : {}),
        },
      },
      ...(query.year ? { referenceYear: query.year } : {}),
      ...(query.q
        ? {
            OR: [
              { title: { contains: query.q, mode: "insensitive" as const } },
              { summary: { contains: query.q, mode: "insensitive" as const } },
              { content: { contains: query.q, mode: "insensitive" as const } },
              {
                documents: {
                  some: {
                    label: { contains: query.q, mode: "insensitive" as const },
                  },
                },
              },
            ],
          }
        : {}),
    };

    const [total, items] = await Promise.all([
      prisma.transparencyItem.count({ where }),
      prisma.transparencyItem.findMany({
        where,
        orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
        select: {
          id: true,
          slug: true,
          title: true,
          summary: true,
          content: true,
          referenceYear: true,
          referenceDate: true,
          publishedAt: true,
          updatedAt: true,
          featured: true,
          documentFormat: true,
          sortOrder: true,
          category: {
            select: {
              id: true,
              slug: true,
              title: true,
            },
          },
          documents: {
            orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }, { label: "asc" }],
            select: {
              id: true,
              label: true,
              fileName: true,
              publicUrl: true,
              mimeType: true,
              fileSizeBytes: true,
              isPrimary: true,
            },
          },
        },
      }),
    ]);

    return ok(request, {
      data: items,
      meta: {
        page: query.page,
        pageSize: query.pageSize,
        total,
        totalPages: Math.ceil(total / query.pageSize),
      },
    });
  } catch (error) {
    return handleError(request, error);
  }
}

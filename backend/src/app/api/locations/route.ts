import { prisma } from "@/lib/db/prisma";
import { handleError, ok, preflight } from "@/lib/http/response";
import { normalizeQueryParams } from "@/lib/validators/common";
import { locationListQuerySchema } from "@/lib/validators/locations";

export async function OPTIONS(request: Request) {
  return preflight(request, "GET,OPTIONS");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = locationListQuerySchema.parse(
      normalizeQueryParams({
        q: searchParams.get("q") ?? undefined,
        page: searchParams.get("page") ?? undefined,
        pageSize: searchParams.get("pageSize") ?? undefined,
      }),
    );

    const where = query.q
      ? {
          OR: [
            { name: { contains: query.q, mode: "insensitive" as const } },
            { address: { contains: query.q, mode: "insensitive" as const } },
          ],
        }
      : undefined;

    const [total, items] = await Promise.all([
      prisma.location.count({ where }),
      prisma.location.findMany({
        where,
        orderBy: [{ name: "asc" }],
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
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

import { ContentStatus, UserRole } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth/session";
import { requireRole } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db/prisma";
import { handleError, ok, preflight } from "@/lib/http/response";
import { createFaqSchema, faqListQuerySchema } from "@/lib/validators/faqs";
import { normalizeQueryParams } from "@/lib/validators/common";

const privilegedRoles: UserRole[] = [UserRole.ADMIN, UserRole.EDITOR];

export async function OPTIONS(request: Request) {
  return preflight(request);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = faqListQuerySchema.parse(
      normalizeQueryParams({
        status: searchParams.get("status") ?? undefined,
        category: searchParams.get("category") ?? undefined,
        featured: searchParams.get("featured") ?? undefined,
        q: searchParams.get("q") ?? undefined,
        page: searchParams.get("page") ?? undefined,
        pageSize: searchParams.get("pageSize") ?? undefined,
      }),
    );

    const user = await getCurrentUser();
    const isPrivileged = !!user && privilegedRoles.includes(user.role);
    const requestedStatus = query.status;

    if (requestedStatus !== undefined && requestedStatus !== ContentStatus.PUBLISHED) {
      requireRole(user, privilegedRoles);
    }

    const where = {
      ...(requestedStatus
        ? { status: requestedStatus }
        : isPrivileged
          ? {}
          : { status: ContentStatus.PUBLISHED }),
      ...(query.category ? { category: query.category } : {}),
      ...(query.featured !== undefined ? { isFeatured: query.featured } : {}),
      ...(query.q
        ? {
            OR: [
              { question: { contains: query.q, mode: "insensitive" as const } },
              { answer: { contains: query.q, mode: "insensitive" as const } },
              { category: { contains: query.q, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [total, items] = await Promise.all([
      prisma.faq.count({ where }),
      prisma.faq.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { question: "asc" }],
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

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    requireRole(user, privilegedRoles);

    const body = await request.json();
    const payload = createFaqSchema.parse(body);

    const created = await prisma.faq.create({
      data: payload,
    });

    return ok(request, { data: created }, { status: 201 });
  } catch (error) {
    return handleError(request, error);
  }
}

import { ContentStatus, UserRole } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth/session";
import { requireRole } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db/prisma";
import { ApiError, handleError, ok, preflight } from "@/lib/http/response";
import { normalizeQueryParams } from "@/lib/validators/common";
import { createPostSchema, postListQuerySchema } from "@/lib/validators/posts";

export async function OPTIONS(request: Request) {
  return preflight(request);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = postListQuerySchema.parse(
      normalizeQueryParams({
        status: searchParams.get("status") ?? undefined,
        q: searchParams.get("q") ?? undefined,
        page: searchParams.get("page") ?? undefined,
        pageSize: searchParams.get("pageSize") ?? undefined,
      }),
    );
    const user = await getCurrentUser();
    const isPrivilegedStatusRequest = query.status !== undefined && query.status !== ContentStatus.PUBLISHED;

    if (isPrivilegedStatusRequest) {
      requireRole(user, [UserRole.ADMIN, UserRole.EDITOR]);
    }

    const status = isPrivilegedStatusRequest ? query.status : ContentStatus.PUBLISHED;

    const where = {
      status,
      ...(query.q
        ? {
            OR: [
              { title: { contains: query.q, mode: "insensitive" as const } },
              { excerpt: { contains: query.q, mode: "insensitive" as const } },
              { content: { contains: query.q, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [total, items] = await Promise.all([
      prisma.post.count({ where }),
      prisma.post.findMany({
        where,
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
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
    requireRole(user, [UserRole.ADMIN, UserRole.EDITOR]);

    const body = await request.json();
    const payload = createPostSchema.parse(body);

    const created = await prisma.post.create({
      data: {
        ...payload,
        publishedAt:
          payload.status === ContentStatus.PUBLISHED
            ? payload.publishedAt ?? new Date()
            : payload.publishedAt ?? null,
      },
    });

    return ok(request, { data: created }, { status: 201 });
  } catch (error) {
    return handleError(request, error);
  }
}

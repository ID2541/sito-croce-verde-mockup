import { ContentStatus, UserRole } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth/session";
import { requireRole } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db/prisma";
import { ApiError, handleError, ok, preflight } from "@/lib/http/response";
import { updatePostSchema } from "@/lib/validators/posts";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function OPTIONS(request: Request) {
  return preflight(request);
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const user = await getCurrentUser();
    requireRole(user, [UserRole.ADMIN, UserRole.EDITOR]);

    const { id } = await context.params;

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new ApiError(404, "NOT_FOUND", "Post not found");
    }

    return ok(request, { data: post });
  } catch (error) {
    return handleError(request, error);
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const user = await getCurrentUser();
    requireRole(user, [UserRole.ADMIN, UserRole.EDITOR]);

    const { id } = await context.params;
    const body = await request.json();
    const payload = updatePostSchema.parse(body);

    const existing = await prisma.post.findUnique({ where: { id } });

    if (!existing) {
      throw new ApiError(404, "NOT_FOUND", "Post not found");
    }

    const updated = await prisma.post.update({
      where: { id },
      data: {
        ...payload,
        publishedAt:
          payload.status === ContentStatus.PUBLISHED
            ? payload.publishedAt ?? existing.publishedAt ?? new Date()
            : payload.publishedAt,
      },
    });

    return ok(request, { data: updated });
  } catch (error) {
    return handleError(request, error);
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const user = await getCurrentUser();
    requireRole(user, [UserRole.ADMIN]);

    const { id } = await context.params;

    await prisma.post.delete({ where: { id } });

    return ok(request, { success: true });
  } catch (error) {
    return handleError(request, error);
  }
}

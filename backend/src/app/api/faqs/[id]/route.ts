import { UserRole } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth/session";
import { requireRole } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db/prisma";
import { ApiError, handleError, ok, preflight } from "@/lib/http/response";
import { updateFaqSchema } from "@/lib/validators/faqs";

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
    const faq = await prisma.faq.findUnique({ where: { id } });

    if (!faq) {
      throw new ApiError(404, "NOT_FOUND", "FAQ not found");
    }

    return ok(request, { data: faq });
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
    const payload = updateFaqSchema.parse(body);

    const existing = await prisma.faq.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, "NOT_FOUND", "FAQ not found");
    }

    const updated = await prisma.faq.update({
      where: { id },
      data: payload,
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
    await prisma.faq.delete({ where: { id } });

    return ok(request, { success: true });
  } catch (error) {
    return handleError(request, error);
  }
}

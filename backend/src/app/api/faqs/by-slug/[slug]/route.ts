import { ContentStatus, UserRole } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { ApiError, handleError, ok, preflight } from "@/lib/http/response";

const privilegedRoles: UserRole[] = [UserRole.ADMIN, UserRole.EDITOR];

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function OPTIONS(request: Request) {
  return preflight(request);
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const user = await getCurrentUser();
    const isPrivileged = !!user && privilegedRoles.includes(user.role);

    const faq = await prisma.faq.findFirst({
      where: {
        slug,
        ...(isPrivileged ? {} : { status: ContentStatus.PUBLISHED }),
      },
    });

    if (!faq) {
      throw new ApiError(404, "NOT_FOUND", "FAQ not found");
    }

    return ok(request, { data: faq });
  } catch (error) {
    return handleError(request, error);
  }
}

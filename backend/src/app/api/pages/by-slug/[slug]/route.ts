import { prisma } from "@/lib/db/prisma";
import { ApiError, handleError, ok, preflight } from "@/lib/http/response";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function OPTIONS(request: Request) {
  return preflight(request, "GET,OPTIONS");
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const page = await prisma.page.findUnique({
      where: { slug },
    });

    if (!page) {
      throw new ApiError(404, "NOT_FOUND", "Page not found");
    }

    return ok(request, { data: page });
  } catch (error) {
    return handleError(request, error);
  }
}

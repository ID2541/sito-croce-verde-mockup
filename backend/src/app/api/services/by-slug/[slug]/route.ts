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

    const service = await prisma.service.findUnique({
      where: { slug },
    });

    if (!service) {
      throw new ApiError(404, "NOT_FOUND", "Service not found");
    }

    return ok(request, { data: service });
  } catch (error) {
    return handleError(request, error);
  }
}

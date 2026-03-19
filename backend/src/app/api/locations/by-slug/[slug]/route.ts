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

    const location = await prisma.location.findUnique({
      where: { slug },
    });

    if (!location) {
      throw new ApiError(404, "NOT_FOUND", "Location not found");
    }

    return ok(request, { data: location });
  } catch (error) {
    return handleError(request, error);
  }
}

import { ContentStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { ApiError, handleError, ok, preflight } from "@/lib/http/response";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function OPTIONS(request: Request) {
  return preflight(request);
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const post = await prisma.post.findFirst({
      where: {
        slug,
        status: ContentStatus.PUBLISHED,
      },
    });

    if (!post) {
      throw new ApiError(404, "NOT_FOUND", "Post not found");
    }

    return ok(request, { data: post });
  } catch (error) {
    return handleError(request, error);
  }
}

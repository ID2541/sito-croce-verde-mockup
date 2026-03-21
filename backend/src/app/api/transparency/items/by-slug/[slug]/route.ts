import { TransparencyStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { ApiError, handleError, ok, preflight } from "@/lib/http/response";
import { transparencyItemSlugParamsSchema } from "@/lib/validators/transparency";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function OPTIONS(request: Request) {
  return preflight(request, "GET,OPTIONS");
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { slug } = transparencyItemSlugParamsSchema.parse(await context.params);

    const item = await prisma.transparencyItem.findFirst({
      where: {
        slug,
        status: TransparencyStatus.PUBLISHED,
        category: {
          is: {
            isActive: true,
          },
        },
      },
      select: {
        id: true,
        slug: true,
        title: true,
        summary: true,
        content: true,
        referenceYear: true,
        referenceDate: true,
        publishedAt: true,
        updatedAt: true,
        featured: true,
        documentFormat: true,
        sortOrder: true,
        category: {
          select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            sortOrder: true,
            parent: {
              select: {
                id: true,
                slug: true,
                title: true,
              },
            },
          },
        },
        documents: {
          orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }, { label: "asc" }],
          select: {
            id: true,
            label: true,
            fileName: true,
            publicUrl: true,
            mimeType: true,
            fileSizeBytes: true,
            checksumSha256: true,
            language: true,
            isPrimary: true,
            sortOrder: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!item) {
      throw new ApiError(404, "NOT_FOUND", "Transparency item not found");
    }

    return ok(request, { data: item });
  } catch (error) {
    return handleError(request, error);
  }
}

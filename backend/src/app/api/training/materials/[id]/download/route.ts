import { ApiError, handleError, preflight, withCors } from "@/lib/http/response";
import { getTrainingGrantFromCookie, touchTrainingAccessGrant } from "@/lib/auth/training-access";
import { getTrainingMaterialById } from "@/lib/training/materials";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function OPTIONS(request: Request) {
  return preflight(request, "GET,OPTIONS");
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const grant = await getTrainingGrantFromCookie();

    if (!grant) {
      throw new ApiError(401, "TRAINING_ACCESS_DENIED", "Accesso ai materiali non autorizzato");
    }

    const { id } = await context.params;
    const material = getTrainingMaterialById(id);

    if (!material) {
      throw new ApiError(404, "TRAINING_MATERIAL_NOT_FOUND", "Materiale non trovato");
    }

    await touchTrainingAccessGrant(grant.id);

    const response = new NextResponse(material.content, {
      status: 200,
      headers: {
        "Content-Type": `${material.mimeType}; charset=utf-8`,
        "Content-Disposition": `attachment; filename="${material.filename}"`,
        "Cache-Control": "no-store",
      },
    });

    return withCors(request, response, "GET,OPTIONS");
  } catch (error) {
    return handleError(request, error);
  }
}

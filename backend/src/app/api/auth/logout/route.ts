import { destroySession } from "@/lib/auth/session";
import { handleError, ok, preflight } from "@/lib/http/response";

export async function OPTIONS(request: Request) {
  return preflight(request, "POST,OPTIONS");
}

export async function POST(request: Request) {
  try {
    await destroySession();

    return ok(request, {
      success: true,
    });
  } catch (error) {
    return handleError(request, error);
  }
}

import { getCurrentUser } from "@/lib/auth/session";
import { fail, handleError, ok, preflight } from "@/lib/http/response";

export async function OPTIONS(request: Request) {
  return preflight(request, "GET,OPTIONS");
}

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return fail(request, 401, "UNAUTHORIZED", "Authentication required");
    }

    return ok(request, { user });
  } catch (error) {
    return handleError(request, error);
  }
}



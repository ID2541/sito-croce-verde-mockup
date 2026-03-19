import { handleError, ok, preflight } from "@/lib/http/response";
import {
  getTrainingAccessState,
  grantTrainingAccessByCode,
  revokeTrainingAccess,
} from "@/lib/auth/training-access";
import { enforceRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { trainingAccessSchema } from "@/lib/validators/training";

export async function OPTIONS(request: Request) {
  return preflight(request, "GET,POST,DELETE,OPTIONS");
}

export async function GET(request: Request) {
  try {
    const access = await getTrainingAccessState();

    return ok(request, {
      access: {
        granted: access.granted,
        grantId: access.grantId,
        grantLabel: access.grantLabel,
        validUntil: access.validUntil?.toISOString() ?? null,
      },
    });
  } catch (error) {
    return handleError(request, error);
  }
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const body = await request.json();
    const payload = trainingAccessSchema.parse(body);

    enforceRateLimit({
      namespace: "training-access-ip",
      key: clientIp,
      windowMs: 10 * 60 * 1000,
      maxRequests: 8,
    });

    const access = await grantTrainingAccessByCode(payload.code);

    return ok(request, {
      access: {
        granted: access.granted,
        grantId: access.grantId,
        grantLabel: access.grantLabel,
        validUntil: access.validUntil?.toISOString() ?? null,
      },
    });
  } catch (error) {
    return handleError(request, error);
  }
}

export async function DELETE(request: Request) {
  try {
    await revokeTrainingAccess();
    return ok(request, { success: true });
  } catch (error) {
    return handleError(request, error);
  }
}

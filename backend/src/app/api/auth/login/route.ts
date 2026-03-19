import { prisma } from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { ApiError, handleError, ok, preflight } from "@/lib/http/response";
import { enforceRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { loginSchema } from "@/lib/validators/auth";

export async function OPTIONS(request: Request) {
  return preflight(request, "POST,OPTIONS");
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const body = await request.json();
    const data = loginSchema.parse(body);

    enforceRateLimit({
      namespace: "auth-login-ip",
      key: clientIp,
      windowMs: 10 * 60 * 1000,
      maxRequests: 10,
    });

    enforceRateLimit({
      namespace: "auth-login-account",
      key: `${clientIp}:${data.email}`,
      windowMs: 10 * 60 * 1000,
      maxRequests: 5,
    });

    const user = await prisma.user.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        email: true,
        role: true,
        passwordHash: true,
      },
    });

    if (!user) {
      console.warn("Invalid login attempt for unknown user", { email: data.email, clientIp });
      throw new ApiError(401, "INVALID_CREDENTIALS", "Invalid email or password");
    }

    const isValid = await verifyPassword(data.password, user.passwordHash);

    if (!isValid) {
      console.warn("Invalid login attempt with wrong password", { email: data.email, clientIp });
      throw new ApiError(401, "INVALID_CREDENTIALS", "Invalid email or password");
    }

    await createSession(user.id);

    return ok(request, {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return handleError(request, error);
  }
}

import type { UserRole } from "@prisma/client";
import { ApiError } from "@/lib/http/response";
import type { SessionUser } from "./session";

export function requireRole(user: SessionUser | null, allowed: UserRole[]): SessionUser {
  if (!user) {
    throw new ApiError(401, "UNAUTHORIZED", "Authentication required");
  }

  if (!allowed.includes(user.role)) {
    throw new ApiError(403, "FORBIDDEN", "Insufficient permissions");
  }

  return user;
}

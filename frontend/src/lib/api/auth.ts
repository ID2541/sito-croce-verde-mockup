import { apiFetch } from "./client";

export type AuthUser = {
  id: string;
  email: string;
  role: "ADMIN" | "EDITOR" | "STAFF";
};

export async function login(email: string, password: string): Promise<AuthUser> {
  const response = await apiFetch<{ user: AuthUser }>("/api/auth/login", {
    method: "POST",
    withCredentials: true,
    body: { email, password },
  });

  return response.user;
}

export async function logout(): Promise<void> {
  await apiFetch<{ success: boolean }>("/api/auth/logout", {
    method: "POST",
    withCredentials: true,
  });
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await apiFetch<{ user: AuthUser }>("/api/auth/me", {
    cache: "no-store",
    withCredentials: true,
  });

  return response.user;
}

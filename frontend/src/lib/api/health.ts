import { apiFetch } from "./client";

export type HealthResponse = {
  status: "ok" | "error";
  timestamp: string;
};

export async function getBackendHealth(): Promise<HealthResponse | null> {
  try {
    return await apiFetch<HealthResponse>("/api/health", {
      cache: "no-store",
    });
  } catch {
    return null;
  }
}

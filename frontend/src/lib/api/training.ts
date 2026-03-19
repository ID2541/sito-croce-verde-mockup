import { env } from "@/config/env";
import { apiFetch } from "./client";

export type TrainingAccess = {
  granted: boolean;
  grantId: string | null;
  grantLabel: string | null;
  validUntil: string | null;
};

export async function getTrainingAccess(): Promise<TrainingAccess> {
  const response = await apiFetch<{ access: TrainingAccess }>("/api/training/access", {
    cache: "no-store",
    withCredentials: true,
  });

  return response.access;
}

export async function unlockTrainingAccess(code: string): Promise<TrainingAccess> {
  const response = await apiFetch<{ access: TrainingAccess }>("/api/training/access", {
    method: "POST",
    withCredentials: true,
    body: { code },
  });

  return response.access;
}

export async function lockTrainingAccess(): Promise<void> {
  await apiFetch<{ success: boolean }>("/api/training/access", {
    method: "DELETE",
    withCredentials: true,
  });
}

export function getTrainingMaterialDownloadUrl(materialId: string): string {
  const encodedId = encodeURIComponent(materialId);
  return `${env.apiBaseUrl}/api/training/materials/${encodedId}/download`;
}

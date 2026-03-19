import type { Location } from "@/content/mock/types";
import { mockLocations } from "@/content/mock/locations";
import { getLocationPlaceholder } from "@/lib/placeholders";
import { apiFetch } from "./client";
import type { ApiLocation, ListResponse } from "./types";

function toUiLocation(location: ApiLocation): Location {
  return {
    id: location.id,
    slug: location.slug,
    name: location.name,
    area: location.area,
    address: location.address,
    phone: location.phone ?? "n.d.",
    hours: location.hours ?? "n.d.",
    notes: location.notes ?? "Contatta la sede per maggiori informazioni.",
    image: getLocationPlaceholder(location.slug),
  };
}

export async function fetchLocations(): Promise<Location[]> {
  try {
    const response = await apiFetch<ListResponse<ApiLocation>>("/api/locations?page=1&pageSize=50", {
      next: { revalidate: 300 },
    });

    return response.data.map(toUiLocation);
  } catch (error) {
    console.error("Unable to fetch locations", error);
    return mockLocations;
  }
}

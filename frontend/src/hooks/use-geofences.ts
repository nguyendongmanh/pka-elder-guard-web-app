import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type {
  GeofenceCreateRequest,
  GeofenceUpsertResponse,
} from "@/types/api";

export function useCreateGeofence() {
  return useMutation<GeofenceUpsertResponse, Error, GeofenceCreateRequest>({
    mutationFn: (data) => apiClient.post("/geofences", data),
  });
}

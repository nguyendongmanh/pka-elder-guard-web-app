import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type {
  LocationUpdateRequest,
  LocationCheckResult,
  LocationHistoryResponse,
} from "@/types/api";

export function useUpdateLocation() {
  return useMutation<LocationCheckResult, Error, LocationUpdateRequest>({
    mutationFn: (data) => apiClient.post("/locations/update", data),
  });
}

export function useLocationHistory(deviceId: string, limit = 50) {
  return useQuery<LocationHistoryResponse, Error>({
    queryKey: ["location-history", deviceId, limit],
    queryFn: () => apiClient.get(`/locations/history/${deviceId}?limit=${limit}`),
    enabled: !!deviceId,
    refetchInterval: 5000,
  });
}

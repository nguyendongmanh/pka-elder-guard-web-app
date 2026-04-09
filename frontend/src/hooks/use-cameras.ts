import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type {
  CameraCreateRequest,
  CameraCreateResponse,
} from "@/types/api";

export function useCreateCamera() {
  return useMutation<CameraCreateResponse, Error, CameraCreateRequest>({
    mutationFn: (data) => apiClient.post("/create/cameras", data),
  });
}

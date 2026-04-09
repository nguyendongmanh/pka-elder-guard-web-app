import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type {
  EventCreateRequest,
  EventResponse,
  LostEventCreateRequest,
} from "@/types/api";

export function useCreateEvent() {
  return useMutation<EventResponse, Error, EventCreateRequest>({
    mutationFn: (data) => apiClient.post("/events", data),
  });
}

export function useCreateLostEvent() {
  return useMutation<EventResponse, Error, LostEventCreateRequest>({
    mutationFn: (data) => apiClient.post("/lost", data),
  });
}

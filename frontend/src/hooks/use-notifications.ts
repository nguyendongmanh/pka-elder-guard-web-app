import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type {
  NotifyUserResponse,
  NotifyAllResponse,
  RegisterDeviceRequest,
  RegisterDeviceResponse,
  RemoveDeviceResponse,
} from "@/types/api";

export function useNotifyUser() {
  return useMutation<
    NotifyUserResponse,
    Error,
    { userId: number; message?: string }
  >({
    mutationFn: ({ userId, message }) => {
      const params = new URLSearchParams();
      if (message) params.append("message", message);
      const qs = params.toString();
      return apiClient.post(`/notify/user/${userId}${qs ? `?${qs}` : ""}`, {});
    },
  });
}

export function useNotifyAll() {
  return useMutation<NotifyAllResponse, Error, string | undefined>({
    mutationFn: (message) => {
      const params = new URLSearchParams();
      if (message) params.append("message", message);
      const qs = params.toString();
      return apiClient.post(`/notify/all${qs ? `?${qs}` : ""}`, {});
    },
  });
}

export function useRegisterDevice() {
  return useMutation<RegisterDeviceResponse, Error, RegisterDeviceRequest>({
    mutationFn: ({ user_id, player_id }) => {
      const params = new URLSearchParams();
      params.append("user_id", String(user_id));
      params.append("player_id", player_id);
      return apiClient.post(`/notify/register?${params.toString()}`, {});
    },
  });
}

export function useRemoveDevice() {
  return useMutation<RemoveDeviceResponse, Error, string>({
    mutationFn: (player_id) => apiClient.delete("/notify/remove", { player_id }),
  });
}

import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth-store";
import type {
  RegisterRequest,
  RegisterResponse,
  LoginResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from "@/types/api";

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: (data) => apiClient.post("/auth/register", data),
  });
}

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation<
    LoginResponse,
    Error,
    { username: string; password: string }
  >({
    mutationFn: ({ username, password }) => {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);
      return apiClient.postForm("/auth/login", formData);
    },
    onSuccess: (data) => {
      setAuth(data.access_token, data.user_id);
    },
  });
}

export function useChangePassword() {
  return useMutation<ChangePasswordResponse, Error, ChangePasswordRequest>({
    mutationFn: (data) => apiClient.post("/auth/change-password", data),
  });
}

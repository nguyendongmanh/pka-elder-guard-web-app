import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  userId: number | null;
  isAuthenticated: boolean;
  setAuth: (accessToken: string, userId: number) => void;
  clearAuth: () => void;
  hydrate: () => void;
}

const TOKEN_KEY = "elderguard_access_token";
const USER_ID_KEY = "elderguard_user_id";

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  userId: null,
  isAuthenticated: false,

  setAuth: (accessToken: string, userId: number) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(USER_ID_KEY, String(userId));
    }
    set({ accessToken, userId, isAuthenticated: true });
  },

  clearAuth: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_ID_KEY);
    }
    set({ accessToken: null, userId: null, isAuthenticated: false });
  },

  hydrate: () => {
    if (typeof window === "undefined") return;
    const accessToken = localStorage.getItem(TOKEN_KEY);
    const userId = localStorage.getItem(USER_ID_KEY);

    if (accessToken && userId) {
      set({
        accessToken,
        userId: Number(userId),
        isAuthenticated: true,
      });
    }
  },
}));

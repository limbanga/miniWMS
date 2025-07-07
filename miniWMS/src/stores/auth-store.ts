import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { User } from "@/data/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,

        login: (user) =>
          set(
            {
              user,
              isAuthenticated: true,
            },
            false,
            "auth/login"
          ),

        logout: () =>
          set(
            {
              user: null,
              isAuthenticated: false,
            },
            false,
            "auth/logout"
          ),
      }),
      {
        name: "auth-storage", // key in localStorage
      }
    )
  )
);

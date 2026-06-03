import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthSession } from "@/types/auth";

type AuthStore = {
  session: AuthSession | null;
  setSession: (session: AuthSession | null) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      session: null,
      setSession: (session) => set({ session }),
      logout: () => set({ session: null }),
      isAuthenticated: () => get().session !== null,
    }),
    { name: "veldt-auth" },
  ),
);

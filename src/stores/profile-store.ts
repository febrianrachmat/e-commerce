import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileOverrides } from "@/types/user";

type ProfileStore = {
  overrides: UserProfileOverrides;
  setOverrides: (patch: UserProfileOverrides) => void;
  clearOverrides: () => void;
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      overrides: {},
      setOverrides: (patch) =>
        set((state) => ({
          overrides: { ...state.overrides, ...patch },
        })),
      clearOverrides: () => set({ overrides: {} }),
    }),
    { name: "luxe-thread-profile" },
  ),
);

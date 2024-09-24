import { create } from "zustand";
import { initialState } from "./types";
import { createJSONStorage, persist } from "zustand/middleware";
import { Organization } from "@/app/utils";

interface OrgStore  {
  orgInfo: Organization;
  updateOrgInfo: (info: Organization) => void;
  resetInfo: () => void;
};

export const useOrgStore = create(
  persist<OrgStore>(
    (set) => ({
      orgInfo: initialState,
      updateOrgInfo: (info) => set((state) => ({ orgInfo: { ...info } })),
      resetInfo: () => set((state) => ({ orgInfo: initialState })),
    }),
    {
      name: "organization",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

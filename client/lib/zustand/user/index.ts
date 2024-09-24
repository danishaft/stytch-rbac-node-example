import { create } from "zustand";
import { initialState } from "./types";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "@/app/utils";

interface UserStore  {
  userInfo: User;
  updateUserInfo: (info: User) => void;
  resetInfo: () => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userInfo: initialState,
      updateUserInfo: (info) => set((state) => ({ userInfo: { ...info } })),
      resetInfo: () => set((state) => ({ userInfo: initialState })),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

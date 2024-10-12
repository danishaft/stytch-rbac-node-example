import { create } from "zustand";
import { initialState } from "./types";
import { createJSONStorage, persist } from "zustand/middleware";
import { Organization, User } from "@/app/utils";
import fetchApi from "@/app/utils/api";

interface OrgStore  {
  orgInfo: Organization;
  orgMembers: User[]
  loading: boolean;
  error: string | null;

  //actions
  updateOrgInfo: (info: Organization) => void;
  resetInfo: () => void;
  fetchOrgMembers: () => Promise<void>;
  addInvitedMember: (data: Partial<User>, departmentId: string) => Promise<void>;
  deleteMember: (memberId: string) => Promise<void>;
};

export const useOrgStore = create(
  persist<OrgStore>(
    (set) => ({
      orgInfo: initialState,
      orgMembers: [],
      loading: false,
      error: null,

      updateOrgInfo: (info) => set((state) => ({ orgInfo: { ...info } })),
      resetInfo: () => set((state) => ({ orgInfo: initialState })),
      fetchOrgMembers: async () => {
        set({ loading: true, error: null });
        try{
          const response = await fetchApi.get(`/organizations/members`);
          console.log(response)
          set({ orgMembers: response.data.organizationMembers, loading: false });
        }catch(error: any){
          set({ error: error.message, loading: false });
        }
      },
      addInvitedMember: async (data, departmentId) => {
        set({ loading: true, error: null });
        try{
          const response = await fetchApi.post(`/organizations/members`, {data, departmentId});
          console.log(response)
          set((state) => ({ 
            orgMembers: [...state.orgMembers, response.data.invitedUser],
            loading: false 
          }));
        }catch(error: any){
          set({ error: error.message, loading: false });
        }
      },
      deleteMember: async (memberId) => {
        set({ loading: true, error: null });
        try{
          const response = await fetchApi.delete(`/organizations/members/${memberId}`);
          set((state) => ({
            orgMembers: state.orgMembers.filter((member) => member.id !== memberId),
            loading: false
          }))
        }catch(error: any){
          set({ error: error.message, loading: false });
        }
      },
    }),
    {
      name: "organization",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

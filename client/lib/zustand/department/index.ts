import { CreateDepartmentProject } from '@/components/custom/department';
import axios from "axios";
import { create, useStore } from "zustand";
import { initialState } from "./types";
import { createJSONStorage, persist } from "zustand/middleware";
import { Department, DepartmentProject, DepartmentProjectTask } from "@/app/utils";
import fetchApi from "@/app/utils/api";

interface DepartmentStore  {
  departments: Department[];
  departmentProjects: DepartmentProject[];
  departmentProjectTasks: DepartmentProjectTask[];
  loading: boolean;
  error: string | null;

  //actions
  createDepartment: (data: Partial<Department>) => Promise<void>;
  fetchDepartments: () => Promise<void>;
  updateDepartment: (orgId: string, deptId: string, data: Partial<Department>) => Promise<void>;
  removeDepartment: (orgId: string, deptId: string) => Promise<void>;
  
  createDepartmentProject: (data: Partial<DepartmentProject>, deptId: string) => Promise<void>;
  getDepartmentProject: (projectId: string) => void
  fetchDepartmentProjects: (deptId: string) => Promise<void>;
  // addDepartmentProject: () => Promise<void>;
  // updateDepartmentProject: () => Promise<void>;
  // removeDepartmentProject: () => Promise<void>;

  createDepartmentProjectTask: (data: Partial<DepartmentProjectTask>, deptId: string, projectId: string) => Promise<void>;
  fetchDepartmentProjectTasks: (deptId: string, projectId: string) => Promise<void>;
//   setDepartmentProjectTasks: () => Promise<void>;
//   addDepartmentProjectTask: () => Promise<void>;
//   removeDepartmentProjectTask: () => Promise<void>;

};

export const useDepartmentStore = create(
  persist<DepartmentStore>(
    (set) => ({
      departments: initialState,
      departmentProjects: [],
      departmentProjectTasks: [],
      loading: false,
      error: null,

      createDepartment: async (data) => {
        set({ loading: true, error: null });
        try{
          const response = await fetchApi.post(`/organizations/departments`, data);
          console.log(response)
          set((state) => ({ 
            departments: [...state.departments, response.data.department],
            loading: false 
          }));
        }catch(error: any){
          set({ error: error.message, loading: false });
        }
      },

      fetchDepartments: async () => {
        set({ loading: true, error: null });
        try{
          const response = await fetchApi.get(`/organizations/departments`);
          console.log(response)
          set({ departments: response.data.departments, loading: false });
        }catch(error: any){
          set({ error: error.message, loading: false });
        }
      },

      updateDepartment: async (orgId, deptId, data) => {
        set({ loading: true, error: null });
        try{
          const response = await fetchApi.put(`/api/organizations/${orgId}/departments/${deptId}`, data);
          set({ departments: response.data, loading: false });
        }catch(error: any){
          set({ error: error.message, loading: false });
        }
      },

      removeDepartment: async (orgId, deptId) => {
        set({ loading: true, error: null });
        try{
          const response = await fetchApi.delete(`/api/organizations/${orgId}/departments/${deptId}`);
          set({ departments: response.data, loading: false });
        }catch(error: any){
          set({ error: error.message, loading: false });
        }
      },

      createDepartmentProject: async (data, deptId) => {
        set({ loading: true, error: null });
        try{
          console.log(deptId)
          const response = await fetchApi.post(`/organizations/departments/${deptId}/projects`, data);
          console.log(response)
          set((state) => ({ 
            departmentProjects: [...state.departmentProjects, response.data.deptProject],
            loading: false 
          }));
        }catch(error: any){
          set({ error: error.message, loading: false });
        }
      },

      getDepartmentProject: async (projectId) => {
        
      },

      fetchDepartmentProjects: async (deptId) => {
        set({ loading: true, error: null });
        try{
          const response = await fetchApi.get(`/organizations/departments/${deptId}/projects`);
          set({ departmentProjects: response.data.deptProjects, loading: false });
        }catch(error: any){
          set({ error: error.message, loading: false });
        }
      },

      createDepartmentProjectTask: async (data, deptId, projectId) => {
        set({ loading: true, error: null });
        try{
          const response = await fetchApi.post(`/organizations/departments/${deptId}/projects/${projectId}/tasks`, data);
          console.log(response)
          set((state) => ({ 
            departmentProjectTasks: [...state.departmentProjectTasks, response.data.deptProjectTask],
            loading: false 
          }));
        }catch(error: any){
          set({ error: error.message, loading: false });
        }
      },
      fetchDepartmentProjectTasks: async(deptId, projectId) => {
        set({ loading: true, error: null });
        try{
          const response = await fetchApi.get(`/organizations/departments/${deptId}/projects/${projectId}/tasks`);
          set({ departmentProjectTasks: response.data.deptProjectTasks, loading: false });
        }catch(error: any){
          set({ error: error.message, loading: false });
        }
      },

    }),
    {
      name: "department",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

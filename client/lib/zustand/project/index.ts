import { Project, ProjectTask } from "@/app/utils";
import fetchApi from "@/app/utils/api";
import { create, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProjectStore {
    publicProjects: Project[];
    privateProjects: Project[];
    ProjectTasks: ProjectTask[];
    loading: boolean;
    error: string | null;

    //actions
    fetchPublicProjects: () => Promise<void>;
    fetchPrivateProjects: () => Promise<void>;
    getProject: (projectId: string) => any;
    createProject: (data: Partial<Project>) => Promise<void>;
    updateProject: (data: Partial<Project>, projectId: string) => Promise<void>;


    // removeProject: (projectId: string) => Promise<void>;

    fetchProjectTasks: (projectId: string) => Promise<void>;
    createProjectTask: (data: Partial<ProjectTask>, projectId: string) => Promise<void>;
}

export const useProjectStore = create(
    persist<ProjectStore>(
        (set, get) => ({
            publicProjects: [],
            privateProjects: [],
            ProjectTasks: [],
            loading: false,
            error: null,

            createProject: async (data) => {
                set({ loading: true, error: null });
                try{
                    const response = await fetchApi.post(`/organizations/projects`, data);
                    console.log(response)
                    if(response.data.project.status === 'private'){
                        set((state) => ({ 
                            privateProjects: [...state.privateProjects, response.data.project],
                        }));
                    }else{
                        set((state) => ({
                            publicProjects: [...state.publicProjects, response.data.project],
                        }))
                    }
                }catch(error: any){
                    set({ error: error.message, loading: false });
                }
            },
            fetchPublicProjects: async () => {
                set({ loading: true, error: null });
                try{
                    const response = await fetchApi.get(`/organizations/projects/public`);
                    console.log(response)
                    set({publicProjects: response.data.projects, loading: false})
                }catch(error: any){
                    set({ error: error.message, loading: false });
                }
            },
            fetchPrivateProjects:  async () => {
                set({ loading: true, error: null });
                try{
                    const response = await fetchApi.get(`/organizations/projects/private`);
                    console.log(response)
                    set({privateProjects: response.data.projects, loading: false})
                }catch(error: any){
                set({ error: error.message, loading: false });
                }
            },
            updateProject: async (data, projectId) => {
                set({ loading: true, error: null });
                try {
                    const response = await fetchApi.put(`/organizations/projects/${projectId}`, data);
                    const updatedProject = response.data.project;
                    set((state) => ({
                        publicProjects: state.publicProjects.map(p => p.id === projectId ? updatedProject : p),
                        privateProjects: state.privateProjects.map(p => p.id === projectId ? updatedProject : p),
                        loading: false
                    }));
                } catch (error: any) {
                    set({ error: error.message, loading: false });
                }
            },
            getProject: (projectId) => {
                const projects = [...get().privateProjects, ...get().publicProjects]
                console.log
                const project = projects.find((p) => p?.id === projectId)
                return project;
            },

            createProjectTask: async (data, projectId) => {
                set({ loading: true, error: null });
                try{

                    const response = await fetchApi.post(`/organizations/projects/${projectId}/tasks`, data);
                    console.log(response)
                    const newTask = response.data.task;
                    set((state) => ({
                        ProjectTasks: [...state.ProjectTasks, newTask]
                    }));
                }catch(error: any){
                    set({ error: error.message, loading: false });
                }
            },
            fetchProjectTasks: async (projectId) => {
                set({ loading: true, error: null });
                try{
                    const response = await fetchApi.get(`/organizations/projects/${projectId}/tasks`);
                    console.log(response)
                    set({publicProjects: response.data.projects, loading: false})
                }catch(error: any){
                    set({ error: error.message, loading: false });
                }
            },
        }),
        {
            name: "project-store",
            storage: createJSONStorage(() => localStorage)
        }
    )
)
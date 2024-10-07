// list all the public projects in a workspace which dont belong to a department
'use client'
import { CreatePublicProject } from "@/components/custom/projects";
import { TooltipButton } from "@/components/ui/buttons/tooltipButton";
import { PageBody, PageHead, PageWrapper } from "@/components/wrappers";
import { MixerHorizontalIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { createPublicProjectSchema, createPublicProjectValues, IcreatePublicProjectSchema } from "../validation";
import { AppStores } from "@/lib/zustand";
import { useEffect } from "react";
import { ProjectCard } from "@/components/custom/ProjectCard";

export default function PublicProjects() {
    const createProject = AppStores.useProjectStore((state) => state.createProject)
    const fetchProjects = AppStores.useProjectStore((state) => state.fetchPublicProjects)
    const projects = AppStores.useProjectStore((state) => state.publicProjects)
    const useProjectStore = AppStores.useProjectStore.getState()

    const handleCreateProject = async (values: IcreatePublicProjectSchema) => {
        createProject(values)
        console.log('creating', projects)
    }
    useEffect(() => {
        fetchProjects()
        console.log('first', projects)
    }, [])

    return (
        <PageWrapper>
            <PageHead name="Public Projects">
                <div className="flex items-center justify-between gap-5">
                    <TooltipButton icon={MixerHorizontalIcon} tip="Filter"/>
                    <TooltipButton icon={TrashIcon} tip="Delete"/>
                    <CreatePublicProject
                        defaultValues={createPublicProjectValues}
                        onSubmit={handleCreateProject}
                        schema={createPublicProjectSchema}
                        isLoading={useProjectStore.loading}
                    />
                </div>
            </PageHead>
            <PageBody className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
            {projects.map(project => 
                <ProjectCard
                    key={project.id}
                    id={project.id}
                    name={project.name}
                    identifier={project.status}
                    description={project.description}
                />
            )
            }
            </PageBody>
        </PageWrapper>
    )
}
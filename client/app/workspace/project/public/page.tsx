// list all the public projects in a workspace which dont belong to a department
'use client'
import { projectData } from "@/app/utils/data/projectData";
import { ProjectDataType } from "@/app/utils/types/Types";
import { CreatePublicProject, ProjectCard } from "@/components/custom/projects";
import { TooltipButton } from "@/components/ui/buttons/tooltipButton";
import { PageBody, PageHead, PageWrapper } from "@/components/wrappers";
import { MixerHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from 'react'

export default function ProjectsPage() {
    const [projects, setProjects] = useState<ProjectDataType[]>(projectData)
    return (
        <PageWrapper>
            <PageHead name="Public Projects">
                <div className="flex items-center justify-between gap-5">
                    <TooltipButton icon={MixerHorizontalIcon} tip="Filter"/>
                    <CreatePublicProject/>
                </div>
            </PageHead>
            <PageBody className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
                {projects.map(project => <ProjectCard key={project.projectId} {...project}/>)}
            </PageBody>
        </PageWrapper>
    )
}
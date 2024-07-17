'use client'
import { projectData } from "@/app/utils/data/projectData";
import { ProjectDataType } from "@/app/utils/types/Types";
import { CreateTask, TaskCard } from "@/components/custom/public-project";
import { TooltipButton } from "@/components/ui/buttons/tooltipButton";
import { PageBody, PageHead, PageWrapper } from "@/components/wrappers";
import { CardStackPlusIcon, PlusIcon } from "@radix-ui/react-icons";
import { notFound, useRouter } from "next/navigation"
import { useState } from "react";

interface ProjectDetailsProps {
    params: {
      projectId: string;
    };
}

export default function ProjectDetails ({params}: ProjectDetailsProps) {
    const router = useRouter();
    const {projectId} = params
    const data = projectData.find((project) => project.projectId === projectId);
    if(!data) notFound();
    const [project, setProject] = useState<ProjectDataType | undefined>(data)
    if(!project) return null;
    
  return (
    <PageWrapper>
      <PageHead name={project?.name}>
        <div className="flex items-center justify-between gap-5">
          <TooltipButton icon={PlusIcon} tip="Invite"/>
          <CreateTask/>
        </div>
      </PageHead>
      <PageBody className="flex flex-col gap-3 bg-white rounded-lg w-full px-4 py-6">
        {project.tasks.map(task => <TaskCard key={task.taskId} task={task} projectId={projectId} />)}
      </PageBody>
    </PageWrapper>
  )
}



// details of the unique project under a unique dept

'use client'
import { departmentData } from "@/app/utils/data/departmentData";
import { ProjectDataType } from "@/app/utils/types/Types";
import { CreateTask } from "@/components/custom/department";
import { TaskCard } from "@/components/custom/department/TaskCard";
import { TooltipButton } from "@/components/ui/buttons/tooltipButton";
import { PageBody, PageHead, PageWrapper } from "@/components/wrappers";
import { CardStackPlusIcon, PlusIcon } from "@radix-ui/react-icons";
import { notFound, useRouter } from "next/navigation"
import { useState } from "react";

interface ProjectDetailsProps {
    params: {
      projectId: string;
      departmentId: string;
    };
}

export default function ProjectDetails ({params}: ProjectDetailsProps) {
    const router = useRouter();
    const {projectId, departmentId} = params
    const department = departmentData.find((department) => department.departmentId === departmentId);
    if(!department) notFound();
    const data = department?.projects.find((project) => project.projectId === projectId);
    const [project, setProject] = useState<ProjectDataType | undefined>(data)
    if(!project) return null;
    
  return (
    <PageWrapper>
      <PageHead name={`${project?.name}-${department.identifier}`}>
        <div className="flex items-center justify-between gap-5">
          <TooltipButton icon={PlusIcon} tip="Invite"/>
          <CreateTask/>
        </div>
      </PageHead>
      <PageBody className="flex flex-col gap-3 bg-white rounded-lg w-full px-4 py-6">
        {project.tasks.map(task => <TaskCard key={task.taskId} task={task} projectId={projectId} departmentId={departmentId} />)}
      </PageBody>
    </PageWrapper>
  )
}
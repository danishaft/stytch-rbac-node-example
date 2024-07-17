'use client'
import { departmentData } from "@/app/utils/data/departmentData";
import { TaskDataType } from "@/app/utils/types/Types";
import { EditTask } from "@/components/custom/public-project";
import { Attachements, Comments, Description, TaskProperties } from "@/components/custom/task";
import { TooltipButton } from "@/components/ui/buttons/tooltipButton";
import { PageBody, PageHead, PageWrapper } from "@/components/wrappers";
import { TrashIcon } from "@radix-ui/react-icons";
import { notFound } from "next/navigation";
import { useState } from "react";

interface TaskDetailsProps {
    params: {
        departmentId: string
        projectId: string
        taskId: string
    }
}

export default function TaskDetails ({params}: TaskDetailsProps) {
    const { departmentId, projectId, taskId} = params
    const department = departmentData.find((department) => department.departmentId === departmentId);
    if(!department) notFound();
    const project = department?.projects.find((project) => project.projectId === projectId);
    const task = project?.tasks.find((task) => task.taskId === taskId);
    const [data, setData] = useState<TaskDataType | undefined>(task)
    if(!project) return null;
    
  return (
    <PageWrapper>
      <PageHead name={`${project.name}/TaskId-${data?.taskId}/${department.identifier}`}>
        <div className="flex items-center justify-between gap-5">
          <TooltipButton icon={TrashIcon} tip="Delete"/>
          <EditTask/>
        </div>
      </PageHead>
      <PageBody className="text-left gap-3 bg-white rounded-lg w-full px-4 py-6">
        <div className="text-left w-full py-3 px-5">
          <h3 className="page-text-1 mb-5">{data?.title}</h3>
          <TaskProperties status={data?.status} assignee={data?.assignee} date={data?.taskId}/>
          <Attachements/>
          <Description/>
          <Comments assignee={data?.assignee}/>
        </div>
      </PageBody>
    </PageWrapper>
  )
}

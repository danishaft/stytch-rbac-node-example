'use client'
import { departmentData } from "@/app/utils/data/departmentData";
import { TaskDataType } from "@/app/utils/types/Types";
import { EditTask } from "@/components/custom/projects";
import { Attachements, Comments, Description, TaskProperties } from "@/components/custom/task";
import { TooltipButton } from "@/components/ui/buttons/tooltipButton";
import { PageBody, PageHead, PageWrapper } from "@/components/wrappers";
import { AppStores } from "@/lib/zustand";
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
    const allDepartments = AppStores.useDepartmentStore((state) => state.departments)
    const allProjects = AppStores.useDepartmentStore((state) => state.departmentProjects)
    const allTasks = AppStores.useDepartmentStore((state) => state.departmentProjectTasks)
    const department = allDepartments.find((department) => department.id === departmentId)
    const project = allProjects.find((project) => project?.id === projectId)
    const task = allTasks.find((task) => task.id === taskId)
    console.log('taskstate', task, department, project)
    const dummyId = taskId.slice(0, 4)
  return (
    <PageWrapper>
      <PageHead name={`${project?.name}/TaskId-${dummyId}/${department?.slug}`}>
        <div className="flex items-center justify-between gap-5">
          <TooltipButton icon={TrashIcon} tip="Delete"/>
          <EditTask/>
        </div>
      </PageHead>
      <PageBody className="text-left gap-3 bg-white rounded-lg w-full px-4 py-6">
        <div className="text-left w-full py-3 px-5">
          <h3 className="page-text-1 mb-5">{task?.title}</h3>
          <TaskProperties status={task?.status} />
          <Attachements/>
          <Description/>
          <Comments assignee={'assignee'}/>
        </div>
      </PageBody>
    </PageWrapper>
  )
}

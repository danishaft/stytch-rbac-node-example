'use client'
import { projectData } from "@/app/utils/data/projectData";
import { ProjectDataType } from "@/app/utils/types/Types";
import { CreateTask } from "@/components/custom/projects";
import { TooltipButton } from "@/components/ui/buttons/tooltipButton";
import { PageBody, PageHead, PageWrapper } from "@/components/wrappers";
import { AppStores } from "@/lib/zustand";
import { CardStackPlusIcon, PlusIcon } from "@radix-ui/react-icons";
import { notFound, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { createProjectTaskSchema, createProjectTaskValues, ICreateProjectTaskSchema } from "../../validation";
import { TaskCard } from "@/components/custom/TaskCard";

interface PublicProjectDetailsProps {
    params: {
      projectId: string;
    };
}

export default function PublicProjectDetails ({params}: PublicProjectDetailsProps) {
    const {projectId} = params
    const createProjectTask = AppStores.useProjectStore((state) => state.createProjectTask)
    const fetchProjectTask = AppStores.useProjectStore((state) => state.fetchProjectTasks)
    const projectTasks = AppStores.useProjectStore((state) => state.ProjectTasks)
    const project = AppStores.useProjectStore((state) => state.getProject)
    const useProjectTaskStore = AppStores.useProjectStore.getState()

    const handleCreateProjectTask = async (values: ICreateProjectTaskSchema) => {
      createProjectTask(values, projectId)
      console.log('creating', projectTasks)
    }
    useEffect(() => {
        fetchProjectTask(projectId)
    }, [])

  return (
    <PageWrapper>
      <PageHead name={`${project(projectId)?.name}-${project(projectId)?.status}`}>
        <div className="flex items-center justify-between gap-5">
          <TooltipButton icon={PlusIcon} tip="Invite"/>
          <CreateTask
            defaultValues={createProjectTaskValues}
            onSubmit={handleCreateProjectTask}
            schema={createProjectTaskSchema}
            isLoading={useProjectTaskStore.loading}
          />
        </div>
      </PageHead>
      <PageBody className="flex flex-col gap-3 bg-white rounded-lg w-full px-4 py-6">
        {projectTasks.map(task => 
          <TaskCard
              key={task.id}
              id={task.id}
              projectId={projectId}
              title={task.title}
              status={task.status}
              identifier={project(projectId)?.status}
          />
        )}
      </PageBody>
    </PageWrapper>
  )
}

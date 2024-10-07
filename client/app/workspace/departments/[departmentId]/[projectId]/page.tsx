

// details of the unique project under a unique dept

'use client'
import { departmentData } from "@/app/utils/data/departmentData";
import { ProjectDataType } from "@/app/utils/types/Types";
import { CreateTask } from "@/components/custom/department";
import { TaskCard } from "@/components/custom/TaskCard";
import { TooltipButton } from "@/components/ui/buttons/tooltipButton";
import { PageBody, PageHead, PageWrapper } from "@/components/wrappers";
import { AppStores } from "@/lib/zustand";
import { CardStackPlusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { notFound, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { createDProjectTaskSchema, createDProjectTaskValues, ICreateDProjectTaskSchema } from "./validations";

interface ProjectDetailsProps {
    params: {
      projectId: string;
      departmentId: string;
    };
}

export default function ProjectDetails ({params}: ProjectDetailsProps) {
    const {projectId, departmentId} = params
    const allDepartments = AppStores.useDepartmentStore((state) => state.departments)
    const allProjects = AppStores.useDepartmentStore((state) => state.departmentProjects)
    const createDeptProjectTask = AppStores.useDepartmentStore((state) => state.createDepartmentProjectTask)
    const fetchDeptProjectTasks = AppStores.useDepartmentStore((state) => state.fetchDepartmentProjectTasks)
    const allDeptProjectTasks = AppStores.useDepartmentStore((state) => state.departmentProjectTasks)
    const useDeptProjectTaskStore = AppStores.useDepartmentStore.getState()
    const department = allDepartments.find((department) => department.id === departmentId)
    const project = allProjects.find((project) => project?.id === projectId)
    const deptProjectTaskArray = allDeptProjectTasks.filter((task) => task.projectId === projectId )
    console.log('projectstate', deptProjectTaskArray, department, project)

    const handleCreateDeptProjectTask = async (values: ICreateDProjectTaskSchema) => {
      createDeptProjectTask(values, departmentId, projectId)
      console.log('creating', deptProjectTaskArray)
    }

    useEffect(() => {
      fetchDeptProjectTasks(departmentId, projectId)
      console.log('first', deptProjectTaskArray, department)
    }, [])
    
  return (
    <PageWrapper>
      <PageHead name={`${project?.name}-${department?.slug}`}>
        <div className="flex items-center justify-between gap-5">
          <TooltipButton icon={PlusIcon} tip="Invite"/>
          <TooltipButton icon={TrashIcon} tip="Delete"/>
          <CreateTask
            defaultValues={createDProjectTaskValues}
            onSubmit={handleCreateDeptProjectTask}
            schema={createDProjectTaskSchema}
            isLoading={useDeptProjectTaskStore.loading}
          />
        </div>
      </PageHead>
      <PageBody className="flex flex-col gap-3 bg-white rounded-lg w-full px-4 py-6">
        {deptProjectTaskArray.map(task => 
          <TaskCard
            key={task.id}
            id={task.id}
            departmentId={departmentId}
            projectId={projectId}
            title={task.title}
            status={task.status}
          />
        )}
        {/* {project.tasks.map(task => <TaskCard key={task.taskId} task={task} projectId={projectId} departmentId={departmentId} />)} */}
      </PageBody>
    </PageWrapper>
  )
}
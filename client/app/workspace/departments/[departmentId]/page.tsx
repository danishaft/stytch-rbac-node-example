'use client'
import { departmentData } from "@/app/utils/data/departmentData";
import { DepartmentDataType } from "@/app/utils/types/Types";
import { CreateDepartmentProject, ProjectCard } from "@/components/custom/department";
import { TooltipButton } from "@/components/ui/buttons/tooltipButton";
import { PageBody, PageHead, PageWrapper } from "@/components/wrappers";
import { AppStores } from "@/lib/zustand";
import { MixerHorizontalIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { notFound } from "next/navigation"
import { useEffect, useState } from "react";
import { createDeptProjectSchema, createDeptProjectValues, ICreateDeptProjectSchema } from "./validations";

interface DepartmentDetailsProps {
    params: {
      departmentId: string;
    };
}

export default function DepartmentDetails ({params}: DepartmentDetailsProps) {
  const {departmentId} = params
  const allDepartments = AppStores.useDepartmentStore((state) => state.departments)
  const createDeptProject = AppStores.useDepartmentStore((state) => state.createDepartmentProject)
  const fetchDeptProjects = AppStores.useDepartmentStore((state) => state.fetchDepartmentProjects)
  const allDeptProjects = AppStores.useDepartmentStore((state) => state.departmentProjects)
  const useDeptProjectStore = AppStores.useDepartmentStore.getState()
  const department  = allDepartments.find((department) => department.id === departmentId)
  const departmentProjects = allDeptProjects.filter((project) => project.departmentId === departmentId)
  console.log('state', departmentProjects, department)
    
    const handleCreateDeptProject = async (values: ICreateDeptProjectSchema) => {
      createDeptProject(values, departmentId)
      console.log('creating', departmentProjects)
    }

    useEffect(() => {
      fetchDeptProjects(departmentId)
      console.log('first', departmentProjects, department)
    }, [])

  return (
    <PageWrapper>
      <PageHead name={`${department?.name}`}>
        <div className="flex items-center justify-between gap-5">
            <TooltipButton icon={MixerHorizontalIcon} tip="Filter"/>
            <TooltipButton icon={TrashIcon} tip="Delete"/>
            <CreateDepartmentProject
              defaultValues={createDeptProjectValues}
              onSubmit={handleCreateDeptProject}
              schema={createDeptProjectSchema}
              isLoading={useDeptProjectStore.loading}
            />
        </div>
      </PageHead>
      <PageBody className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
        {/* details of a unique department */}
        {departmentProjects.map(deptProject => 
          <ProjectCard 
            key={deptProject.id} 
            departmentId={departmentId} 
            deptSlug={`${department?.slug}`} 
            id={deptProject.id} 
            name={deptProject.name} 
            description={deptProject.description} 
          />)
        }
        {/* {department.projects.map(project => <ProjectCard key={project.projectId} departmentId={departmentId} project={project} identifier={department.identifier} />)} */}
      </PageBody>
    </PageWrapper>
  )
}
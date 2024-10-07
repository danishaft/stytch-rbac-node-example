'use client'
import { CreatePrivateProject, CreatePublicProject,  } from '@/components/custom/projects'
import { TooltipButton } from '@/components/ui/buttons/tooltipButton'
import { PageBody, PageHead, PageWrapper } from '@/components/wrappers'
import { MixerHorizontalIcon, TrashIcon } from '@radix-ui/react-icons'
import React, { useEffect } from 'react'
import { createProjectSchema, createProjectValues, ICreateProjectSchema } from '../validation'
import { AppStores } from '@/lib/zustand'
import { ProjectCard } from '@/components/custom/ProjectCard'

export default function PersonalProjects() {
  const createProject = AppStores.useProjectStore((state) => state.createProject)
  const fetchProjects = AppStores.useProjectStore((state) => state.fetchPrivateProjects)
  const useProjectStore = AppStores.useProjectStore.getState()
  const projects = AppStores.useProjectStore((state) => state.privateProjects)

  const handleCreateProject = async (values: ICreateProjectSchema) => {
    createProject(values)
    console.log('creating', projects)
  }
  useEffect(() => {
    fetchProjects()
    console.log('first', projects)
  }, [])
  return (
    <PageWrapper>
      <PageHead name={`private projects`}>
        <div className="flex items-center justify-between gap-5">
          <TooltipButton icon={MixerHorizontalIcon} tip="Filter"/>
          <TooltipButton icon={TrashIcon} tip="Delete"/>
          <CreatePrivateProject
            defaultValues={createProjectValues}
            onSubmit={handleCreateProject}
            schema={createProjectSchema}
            isLoading={useProjectStore.loading}
          />
        </div>
      </PageHead>
      <PageBody className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
        {/* LIST OF PRIVATE PROJECTS */}
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

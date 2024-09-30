import { CreateTask } from '@/components/custom/projects';
import { TooltipButton } from '@/components/ui/buttons/tooltipButton';
import { PageBody, PageHead, PageWrapper } from '@/components/wrappers';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import React, { useEffect } from 'react'
import { createProjectTaskSchema, createProjectTaskValues, ICreateProjectTaskSchema } from '../../validation';
import { AppStores } from '@/lib/zustand';

interface PersonalProjectProps {
    params: {
        projectId: string;
    }
}

export default function PersonalProjectDetails({params}:PersonalProjectProps ) {
    const {projectId} = params
    const createProjectTask = AppStores.useProjectStore((state) => state.createProjectTask)
    const fetchProjectTask = AppStores.useProjectStore((state) => state.fetchProjectTasks)
    const projectTasks = AppStores.useProjectStore((state) => state.ProjectTasks)
    const project = AppStores.useProjectStore((state) => state.getProject)
    const useProjectTaskStore = AppStores.useProjectStore.getState()

    const handleCreateProjectTask = async (values: ICreateProjectTaskSchema) => {
        createProjectTask(values, projectId)
    }
    useEffect(() => {
        fetchProjectTask(projectId)
    }, [])
  return (
    <PageWrapper>
        <PageHead name={`${project(projectId)?.name}-${project(projectId).status}`}>
            <div className="flex items-center justify-between gap-5">
                <TooltipButton icon={PlusIcon} tip="Invite"/>
                <TooltipButton icon={TrashIcon} tip="Delete"/>
                <CreateTask
                    defaultValues={createProjectTaskValues}
                    onSubmit={handleCreateProjectTask}
                    schema={createProjectTaskSchema}
                    isLoading={useProjectTaskStore.loading}
                />
            </div>
        </PageHead>
        <PageBody>
            {/*  */}
            <div>lllll</div>
        </PageBody>
    </PageWrapper>
  )
}

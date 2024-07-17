'use client'
import { departmentData } from "@/app/utils/data/departmentData";
import { DepartmentDataType } from "@/app/utils/types/Types";
import { CreateDepartmentProject, ProjectCard } from "@/components/custom/department";
import { TooltipButton } from "@/components/ui/buttons/tooltipButton";
import { PageBody, PageHead, PageWrapper } from "@/components/wrappers";
import { MixerHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import { notFound } from "next/navigation"
import { useState } from "react";

interface DepartmentDetailsProps {
    params: {
      departmentId: string;
    };
}

export default function DepartmentDetails ({params}: DepartmentDetailsProps) {
    const {departmentId} = params
    const data = departmentData.find((department) => department.departmentId === departmentId);
    if(!data) notFound();
    const [department, setDepartment] = useState<DepartmentDataType | undefined>(data)
    if(!department) return null;
    
  return (
    <PageWrapper>
      <PageHead name={department.name}>
        <div className="flex items-center justify-between gap-5">
            <TooltipButton icon={MixerHorizontalIcon} tip="Filter"/>
            <CreateDepartmentProject/>
        </div>
      </PageHead>
      <PageBody className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
        {/* details of a unique department */}
        {department.projects.map(project => <ProjectCard key={project.projectId} departmentId={departmentId} project={project} identifier={department.identifier} />)}
      </PageBody>
    </PageWrapper>
  )
}
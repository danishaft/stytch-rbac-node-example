'use client'
import { departmentData } from "@/app/utils/data/departmentData";
import { DepartmentDataType } from "@/app/utils/types/Types";
import { CreateDepartment, DepartmentCard } from "@/components/custom/department";
import { TooltipButton } from "@/components/ui/buttons/tooltipButton";
import { PageBody, PageHead, PageWrapper } from "@/components/wrappers";
import { MixerHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<DepartmentDataType[]>(departmentData)
    return (
    <PageWrapper>
      <PageHead name="Departments">
        <div className="flex items-center justify-between gap-5">
          <TooltipButton icon={MixerHorizontalIcon} tip="Filter"/>
          <CreateDepartment/>
        </div>
      </PageHead>
      <PageBody className="flex flex-col gap-3 bg-white rounded-lg w-full px-4 py-6">
        {/* all depts listed */}
        {departments.map(department => <DepartmentCard key={department.departmentId} {...department}/>)}
      </PageBody>
    </PageWrapper>
  )
}
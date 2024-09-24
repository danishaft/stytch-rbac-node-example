'use client'
import { departmentData } from "@/app/utils/data/departmentData";
import { DepartmentDataType } from "@/app/utils/types/Types";
import { CreateDepartment, DepartmentCard } from "@/components/custom/department";
import { TooltipButton } from "@/components/ui/buttons/tooltipButton";
import { PageBody, PageHead, PageWrapper } from "@/components/wrappers";
import { MixerHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { createDeptSchema, createDeptValues, ICreateDeptSchema } from "./validation";
import { AppStores } from "@/lib/zustand";
import fetchApi from "@/app/utils/api";

export default function DepartmentsPage() {
  const createDept = AppStores.useDepartmentStore((state) => state.createDepartment)
  const fetchDepts = AppStores.useDepartmentStore((state) => state.fetchDepartments)
  const departmentArray = AppStores.useDepartmentStore((state) => state.departments)
  const useDeptStore = AppStores.useDepartmentStore.getState() 
  const [departments, setDepartments] = useState<DepartmentDataType[]>(departmentData)
  console.log('state', departmentArray)

  const handleCreateDept = async (values: ICreateDeptSchema) => {
    createDept(values)
  }

  useEffect(() => {
    fetchDepts()
    console.log('first', departmentArray)
  }, [])

    return (
      <PageWrapper>
        <PageHead name="Departments">
          <div className="flex items-center justify-between gap-5">
            <TooltipButton icon={MixerHorizontalIcon} tip="Filter"/>
            <CreateDepartment
              defaultValues={createDeptValues}
              onSubmit={handleCreateDept}
              schema={createDeptSchema}
              isLoading={useDeptStore.loading}
            />
          </div>
        </PageHead>
        <PageBody className="flex flex-col gap-3 bg-white rounded-lg w-full px-4 py-6">
          {/* all depts listed */}
          {departmentArray.map(department => <DepartmentCard key={department.id} {...department}/>)}
          {/* {departments.map(department => <DepartmentCard key={department.departmentId} {...department}/>)} */}
        </PageBody>
      </PageWrapper>
  )
}
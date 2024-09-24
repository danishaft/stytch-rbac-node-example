import Link from "next/link"
import { DepartmentHead } from "./Head"
import { DepartmentFoot } from "./Foot"
import { DepartmentDataType } from "@/app/utils/types/Types"

interface DepartmentCardProps {
  id: string
  name: string
  slug: string
  description: string
}
export const DepartmentCard = ({name, description, id, slug}: DepartmentCardProps) => {
  return (
    <Link href={`/workspace/departments/${id}`} className="block w-full">
      <div className="flex items-center justify-between p-3 border bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-shadow duration-300 overflow-hidden ">
        <div className="flex items-center justify-between">
            <DepartmentHead name={name}/>
        </div>
        <p>{slug}</p>
        <DepartmentFoot count={3}/>
      </div>
    </Link>
  )
}

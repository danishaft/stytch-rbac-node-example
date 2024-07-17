import Link from "next/link"
import { DepartmentHead } from "./Head"
import { DepartmentFoot } from "./Foot"
import { DepartmentDataType } from "@/app/utils/types/Types"

// interface DepartmentCardProps {
//   name: string
//   identif
// }
export const DepartmentCard: React.FC<DepartmentDataType> = ({name, identifier, projects, departmentId}) => {
  return (
    <Link href={`/workspace/departments/${departmentId}`} className="block w-full">
      <div className="flex items-center justify-between p-3 border bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-shadow duration-300 overflow-hidden ">
        <div className="flex items-center justify-between">
            <DepartmentHead name={name}/>
        </div>
        <p>{identifier}</p>
        <DepartmentFoot count={projects.length}/>
      </div>
    </Link>
  )
}

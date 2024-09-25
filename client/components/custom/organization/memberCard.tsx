import { TaskDataType } from "@/app/utils/types/Types"
import { AssignButton } from "@/components/ui/buttons/assignButton"
import { DotsVerticalIcon, LightningBoltIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { TaskHeader } from "../task/Head"
import { TaskDates } from "../task/Date"
import { TaskFooter } from "../task/Foot"
import { Status } from "../task"

interface MemberCardProps {
    id: string;
    name: string;
    email: string;
    status: string;
    role: string;
}

export const MemberCard = ({email, role, id, status, name}: MemberCardProps) => {
  const taskId = id.slice(0, 4)
  return (
    <div className="flex items-center w-full justify-between p-2 border-b border-t overflow-hidden ">
        <div className="flex items-center space-x-2 ">
            <LightningBoltIcon className="w-5 h-5 text-yellow-500" />
            <div className="flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-500 text-ellipsis">{email}</p>
            </div>
        </div>
        <span className="text-xl font-medium">{role}</span>
        <Status status={status}/>
        <button className="text-gray-400 hover:text-gray-600">
            <DotsVerticalIcon className="w-5 h-5" />
        </button>
    </div>
  )
}
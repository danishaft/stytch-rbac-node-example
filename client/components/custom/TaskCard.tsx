import { TaskDataType } from "@/app/utils/types/Types"
import { AssignButton } from "@/components/ui/buttons/assignButton"
import { DotsVerticalIcon, LightningBoltIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { TaskHeader } from "./task/Head"
import { TaskDates } from "./task/Date"
import { TaskFooter } from "./task/Foot"

interface TaskCardProps {
    id: string
    title: string
    projectId: string
    departmentId?: string
    status: string
    identifier?: string
}

export const TaskCard = ({departmentId, projectId, id, title, status, identifier}: TaskCardProps) => {
  const taskId = id.slice(0, 4)
  const getProjectLink = () => {
    switch (identifier) {
      case "private":
        return `/workspace/project/personal/${projectId}/tasks/${id}`;
      case "public":
        return `/workspace/project/public/${projectId}/tasks/${id}`;
      default:
        return `/workspace/departments/${departmentId}/${projectId}/tasks/${id}`;
    }
  };
  return (
    <Link href={`/workspace/departments/${departmentId}/${projectId}/tasks/${id}`} className="block w-full">
      <div className="flex items-center justify-between p-2 border bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-shadow duration-300 overflow-hidden ">
        <div className="flex items-center justify-between w-2/3 ">
            <TaskHeader id={taskId} title={title} />
            <TaskDates startDate="2024-12-31" dueDate="2024-12-31" />
        </div>
        <TaskFooter status={status} />
      </div>
    </Link>
  )
}
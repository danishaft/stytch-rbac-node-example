import { AssignButton } from "@/components/ui/buttons/assignButton"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { Status } from "./Status";

interface TaskFooterProps {
  status: string;
}

export const TaskFooter: React.FC<TaskFooterProps> = ({ status }) => {
    return (
        <div className="flex items-center justify-between gap-3">
            <Status status={status}/>
            <AssignButton />
            <button className="text-gray-400 hover:text-gray-600">
                <DotsVerticalIcon className="w-5 h-5" />
            </button>
        </div>
    )
}
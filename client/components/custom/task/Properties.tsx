import { AvatarIcon, CalendarIcon, CheckCircledIcon, PersonIcon } from "@radix-ui/react-icons"
import { Status } from "./Status"
import { AssignButton } from "@/components/ui/buttons/assignButton"

interface TaskPropertiesProps {
    status: any
}
export const TaskProperties = ({status}: TaskPropertiesProps) => {
  return (
    <div className="border-b-2">
        <div className="flex items-center gap-x-28 mb-3">
            <span className="flex items-center gap-1">
              <CheckCircledIcon/>
              <p>Status</p>
            </span>
            <Status status={status}/>
        </div>

        <div className="flex items-center gap-x-28 mb-3">
            <span className="flex items-center gap-1">
              <PersonIcon/>
              <p>Owner</p>
            </span>
            <AssignButton/>
        </div>

        <div className="flex items-center gap-x-28 mb-3">
            <span className="flex items-center gap-1">
              <AvatarIcon/>
              <p>Assignee</p>
            </span>
            <AssignButton/>
        </div>

        <div className="flex items-center gap-x-28 mb-3">
            <span className="flex items-center gap-1">
              <CalendarIcon/>
              <p>Due Date</p>
            </span>
            <p>March 24th 2023</p>
        </div>
    </div>
  )
}

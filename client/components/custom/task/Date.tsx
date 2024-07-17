import { LapTimerIcon } from "@radix-ui/react-icons";

// TaskDates.tsx
interface TaskDatesProps {
    startDate: string;
    dueDate: string;
}
  
export const TaskDates: React.FC<TaskDatesProps> = ({ startDate, dueDate }) => (
    <div className="flex items-center justify-start space-x-9">
      <div className="text-left">
        <p className="text-xs text-gray-500">Start Date</p>
        <div className="flex items-center gap-1"><LapTimerIcon/><span className="text-sm ">{startDate}</span></div>
      </div>
      <div className="text-left">
        <p className="text-xs text-gray-500">Due Date</p>
        <div className="flex items-center gap-1"><LapTimerIcon/><span className="text-sm ">{dueDate}</span></div>
      </div>
    </div>
)
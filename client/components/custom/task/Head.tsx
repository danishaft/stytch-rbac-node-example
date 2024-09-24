import { LightningBoltIcon } from "@radix-ui/react-icons";

interface TaskHeaderProps {
    id: string | number;
    title: string;
  }
  
  export const TaskHeader: React.FC<TaskHeaderProps> = ({ id, title }) => (
    <div className="flex items-center space-x-2 ">
      <LightningBoltIcon className="w-5 h-5 text-yellow-500" />
      <div className="flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 text-ellipsis">#{id} created 5 days ago by <span className="font-medium text-gray-700">Lead</span></p>
      </div>
    </div>
  )
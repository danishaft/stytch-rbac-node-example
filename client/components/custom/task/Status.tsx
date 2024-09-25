import { TaskDataType } from "@/app/utils/types/Types"

export const Status = ({status}: {status: any}) => {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        status === 'completed' || 'active' ? 'bg-green-100 text-green-800' :
        status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
    }`}>
        {status}
    </span>
  )
}

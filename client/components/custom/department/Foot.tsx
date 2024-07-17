import { AssignButton } from "@/components/ui/buttons/assignButton"
import { DotsVerticalIcon, LayersIcon } from "@radix-ui/react-icons"

export const DepartmentFoot = ({count}: {count: number}) => {
  return (
    <div className="flex items-center justify-between space-x-6">
        <AssignButton />
        <div className="flex items-center space-x-1">
          <LayersIcon/>
          <p>{count}</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
            <DotsVerticalIcon className="w-5 h-5" />
        </button>
    </div>
  )
}

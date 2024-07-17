import { ProjectDataType } from "@/app/utils/types/Types";
import { AssignButton } from "@/components/ui/buttons/assignButton";
import { LapTimerIcon, TargetIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const ProjectCard: React.FC<ProjectDataType> = ({ projectId, name, lead, description, tasks, type }) => {
  return (
    <Link href={`/workspace/projects/${projectId}`} className="block w-full">
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden p-4">
          <div className="flex justify-between items-center">
            <h2 className="page-text-1">{name}</h2>
            <span className="status">{type}</span>
          </div>
          <div className="bg-newPrimary w-full h-[2px] my-2"></div>
          <p className="page-text-3 text-dark2 mb-5 mt-3 line-clamp-2">{description}</p>
          <div className="flex items-center gap-1 text-newPrimary page-text-3 font-medium mb-1">
            <LapTimerIcon/>
            <span>2024-12-31</span>
          </div>
          <div className="flex justify-between items-center ">
            <span className="flex items-center gap-1 page-text-3 text-dark2">
              <p>Lead: </p>
              <AssignButton/>
            </span>
            <div className="flex items-center gap-1 page-text-3 font-normal text-dark2"><TargetIcon/><p>{tasks.length} Tasks</p></div>
          </div>
        </div>
    </Link>
  )
}

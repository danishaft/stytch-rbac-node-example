import { ProjectDataType } from "@/app/utils/types/Types";
import { AssignButton } from "@/components/ui/buttons/assignButton";
import { LapTimerIcon, TargetIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface ProjectCardProps{
    project: ProjectDataType;
    departmentId: string;
    identifier: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ departmentId, project, identifier }) => {
    const {name, lead, description, projectId, tasks, type} = project
  return (
    <Link href={`/workspace/departments/${departmentId}/${projectId}`} className="block w-full">
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden p-4">
          <div className="flex justify-between items-center">
            <h2 className="page-text-1">{name}</h2>
            <span className="status">{identifier}</span>
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
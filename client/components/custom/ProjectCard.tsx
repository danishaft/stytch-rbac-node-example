import { ProjectDataType } from "@/app/utils/types/Types";
import { AssignButton } from "@/components/ui/buttons/assignButton";
import { LapTimerIcon, TargetIcon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { TooltipButton } from "../ui/buttons/tooltipButton";
import { useStytchIsAuthorized } from "@stytch/nextjs/b2b";
import { AppStores } from "@/lib/zustand";

interface ProjectCardProps{
    id: string;
    name: string;
    departmentId?: string;
    identifier: string;
    description: string;
}

export const ProjectCard = ({ id, departmentId, name, identifier, description }: ProjectCardProps) => {
  console.log(departmentId, id)
  const projectId = id
  const useDeptStore = AppStores.useDepartmentStore.getState()
  const getProjectLink = () => {
    switch (identifier) {
      case "private":
        return `/workspace/project/personal/${projectId}`;
      case "public":
        return `/workspace/project/public/${projectId}`;
      default:
        return `/workspace/departments/${departmentId}/${projectId}`;
    }
  };

  const {isAuthorized: canDelete} = useStytchIsAuthorized('department-project', 'delete');
  const deleteDeptProject = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!departmentId) {
      console.error("Cannot delete project: departmentId is undefined");
      return;
    }
    try {
      console.log('deleting')
      await useDeptStore.removeDepartmentProject(departmentId, id);
      console.log("Department deleted, attempting to navigate...");
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete department:", error);
    }
  };

  return (
      <Link href={getProjectLink()} className="block w-full">
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
            <div className="flex items-center gap-1 page-text-3 font-normal text-dark2">
              <TargetIcon/>
              <p>{3} Tasks</p>
            </div>
            <TooltipButton 
              icon={TrashIcon} 
              tip="Delete"
              disabled={!canDelete || useDeptStore.loading}
              onClick={deleteDeptProject}
            />
          </div>
        </div>
      </Link>
  )
}
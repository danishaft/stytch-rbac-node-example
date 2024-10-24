import Link from "next/link"
import { DepartmentHead } from "./Head"
import { DepartmentFoot } from "./Foot"
import { DepartmentDataType } from "@/app/utils/types/Types"
import { CheckIcon, DotsVerticalIcon, HomeIcon, LayersIcon, TrashIcon } from "@radix-ui/react-icons"
import { AppStores } from "@/lib/zustand"
import { useMemberServices } from "@/app/utils"
import { useStytchIsAuthorized, useStytchMember } from '@stytch/nextjs/b2b'
import { AssignButton } from "@/components/ui/buttons/assignButton"
import { TooltipButton } from "@/components/ui/buttons/tooltipButton"
import { useRouter } from "next/navigation"

interface DepartmentCardProps {
  id: string
  name: string
  slug: string
  description: string
}
export const DepartmentCard = ({name, description, id, slug}: DepartmentCardProps) => {
  const {member: stytchMember, isInitialized} = useStytchMember();
  const user = AppStores.useUserStore((state) => state.userInfo)
  const useDeptStore = AppStores.useDepartmentStore.getState()
  const {getRole} = useMemberServices()
  const isJoined = id === user.departmentId;
  const isAdmin = isInitialized && stytchMember ? getRole(stytchMember) === 'admin' : false;

  const {isAuthorized: canDelete} = useStytchIsAuthorized('department', 'delete');
  const deleteDept = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      console.log('deleting')
      await useDeptStore.removeDepartment(id);
      console.log("Department deleted, attempting to navigate...");
    } catch (error) {
      console.error("Failed to delete department:", error);
    }
  };

  return (
    <Link href={`/workspace/departments/${id}`} className="block w-full">
      <div className="flex items-center justify-between p-3 border bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-shadow duration-300 overflow-hidden ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 ">
            <HomeIcon className="size-4 text-newPrimary" />
            <h3 className="text-lg font-semibold text-dark">{name}</h3>
            <div 
              className={`flex items-center rounded-sm px-1 bg-sec-bg text-dark1 border-dark1 border text-[10px] font-medium ${!isJoined && !isAdmin ? 'invisible' : ''}`}
              aria-hidden={!isJoined && !isAdmin}
            >
              <CheckIcon className="size-4"/>
              <p>Joined</p>
            </div>
          </div>
        </div>
        <p>{slug}</p>
        <div className="flex items-center justify-between space-x-6">
          <AssignButton />
          <div className="flex items-center space-x-1">
            <LayersIcon/>
            <p>{3}</p>
          </div>
          <TooltipButton 
              icon={TrashIcon} 
              tip="Delete"
              disabled={!canDelete || useDeptStore.loading}
              onClick={deleteDept}
            />
          {/* <button className="text-gray-400 hover:text-gray-600">
              <DotsVerticalIcon className="w-5 h-5" />
          </button> */}
        </div>
      </div>
    </Link>
  )
}

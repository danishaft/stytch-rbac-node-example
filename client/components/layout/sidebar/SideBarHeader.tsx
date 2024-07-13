import Logo from "@/components/ui/logo"
import { Dropdown } from "../DropDown"

export const SideBarHeader = () => {
  return (
    <div className="flex items-center border-b h-16 py-4 px-4">
        <Logo/>
        <p className='ml-2 font-bold text-lg'>Collabo</p>
        <Dropdown/>
    </div>
  )
}

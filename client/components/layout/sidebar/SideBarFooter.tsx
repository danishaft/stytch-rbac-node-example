import Link from "next/link"
import { PersonIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { InviteMembers } from "../../custom/organization/InviteMembers"
import { buttonVariants } from "@/components/ui/button"


export const SideBarFooter = () => {
  return (
    <div className=" flex flex-col border-t py-4 gap-6">
        <Link 
            href={'/workspace/members'} 
            className={cn(
                        buttonVariants({
                        size: "sm",
                        variant: "ghost",
                        }),
                        "justify-start",
        )}>
            <PersonIcon  className="mr-2 h-4 w-4 shrink-0" aria-hidden="true"/>
            Members
        </Link>
    </div>
  )
}

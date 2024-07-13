import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const UserProfile = () => {
  return (
    <div className="flex items-center gap-1">
        <div className="flex flex-col h-full">
            <p className="text-[.8rem] font-medium">Ejeh Daniel</p>
            <p className="text-[.55rem] mt-auto text-right">Abj, Nigeria</p>
        </div>
        <div className="flex-shrink-0 ml-2">
            <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>   
    </div>
  )
}

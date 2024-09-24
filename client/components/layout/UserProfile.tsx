import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserProfileProps {
  name: string;
  location: string;
  image: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({name, location, image}) => {
  return (
    <div className="flex items-center gap-1">
        <div className="flex flex-col h-full capitalize">
            <p className="text-[.8rem] font-medium">{name}</p>
            <p className="text-[.55rem] mt-auto text-right">{location}</p>
        </div>
        <div className="flex-shrink-0 ml-2">
            <Avatar className="h-10 w-10">
                <AvatarImage src={image} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>   
    </div>
  )
}

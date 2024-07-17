import { Avatar, AvatarFallback, AvatarImage } from "../avatar"

export const AssignButton = () => {
  return (
    <Avatar className="size-4">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

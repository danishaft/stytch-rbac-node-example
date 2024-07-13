import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon } from "@radix-ui/react-icons"

export function InviteMembers() {
  return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size={'sm'} > <PlusIcon  className="mr-2 h-4 w-4 shrink-0" aria-hidden="true"/> Invite Members</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when youre done.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                    Name
                    </Label>
                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                    Username
                    </Label>
                    <Input id="username" value="@peduarte" className="col-span-3" />
                </div>
                </div>
                <DialogFooter>
                <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}

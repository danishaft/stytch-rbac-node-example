import { Department } from "@/app/utils"
import { IinviteToOrgSchema, inviteToOrgSchema } from "@/app/workspace/members/validations"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"

interface InviteMembersProps {
    departments: Department[];
    schema: typeof inviteToOrgSchema;
    defaultValues: IinviteToOrgSchema;
    onSubmit: (values: IinviteToOrgSchema) => void;
    isLoading?: boolean;
}

export function InviteMembers({departments = [], defaultValues, onSubmit, schema, isLoading}: InviteMembersProps) {
    // Define form
    const form = useForm<IinviteToOrgSchema>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });

    const handleSubmit = async (values: IinviteToOrgSchema) => {
        onSubmit(values);
    };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"} className="bg-newPrimary/80 text-white hover:bg-newPrimary hover:text-white">Invite members</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Invite member to your workspace. Click invite when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input placeholder="Enter email" {...field}
                        className={form.formState.errors.email ? 'border-red-500' : ''}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departmentId"
              render={({field}) => (
                <FormItem>
                  <Label htmlFor="departmentId" className="text-right">
                    Add to department
                  </Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Departments</SelectLabel>
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">
                    Invite
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

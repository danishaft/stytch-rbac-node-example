import { useStytchIsAuthorized } from '@stytch/nextjs/b2b'
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SubmitHandler, useForm } from "react-hook-form";
import { createDeptSchema, ICreateDeptSchema } from "@/app/workspace/departments/validation"
import { zodResolver } from "@hookform/resolvers/zod"

interface DeptFormProps {
  schema: typeof createDeptSchema;
  defaultValues: ICreateDeptSchema;
  onSubmit: (values: ICreateDeptSchema) => void;
  isLoading?: boolean;
}
export function CreateDepartment({schema, defaultValues, onSubmit, isLoading}: DeptFormProps) {
  const {isAuthorized: canCreate} = useStytchIsAuthorized('department', 'create')
  // Define form
  const form = useForm<ICreateDeptSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const handleSubmit = async (values: ICreateDeptSchema) => {
    onSubmit(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!canCreate} variant="outline" size={"sm"} className="bg-newPrimary/80 text-white hover:bg-newPrimary hover:text-white">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Department</DialogTitle>
          <DialogDescription>
            Enter the details for the new department. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Label htmlFor="Name" className="text-right">
                        Name
                      </Label>
                      <Input placeholder="Enter department name" {...field}
                        className={form.formState.errors.name ? 'border-red-500' : ''}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Label htmlFor="slug" className="text-right">
                        Slug
                      </Label>
                      <Input placeholder="Enter slug name" {...field}
                        className={form.formState.errors.name ? 'border-red-500' : ''}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input placeholder="Enter description" {...field}
                        className={form.formState.errors.description ? 'border-red-500' : ''}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="managerId"
              render={({field}) => (
                <FormItem>
                  <Label htmlFor="manager" className="text-right">
                    Manager
                  </Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a manager" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Managers</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">
                  {isLoading ?
                    '...loading' :
                    'Create'
                  }
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
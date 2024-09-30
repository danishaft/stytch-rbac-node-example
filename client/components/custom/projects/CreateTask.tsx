import { createProjectTaskSchema, ICreateProjectTaskSchema } from "@/app/workspace/project/validation"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface ProjectTaskFormProps {
  schema: typeof createProjectTaskSchema;
  defaultValues: ICreateProjectTaskSchema;
  onSubmit: (values: ICreateProjectTaskSchema) => void;
  isLoading?: boolean;
}

export function CreateTask({defaultValues, onSubmit, isLoading, schema}: ProjectTaskFormProps) {
  const form = useForm<ICreateProjectTaskSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  })

  const handleSubmit = async (values: ICreateProjectTaskSchema) => {
    onSubmit(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"} className="bg-newPrimary/80 text-white hover:bg-newPrimary hover:text-white">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Create project task here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input placeholder="Enter project task title" {...field}
                        className={form.formState.errors.title ? 'border-red-500' : ''}
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
                      <Input placeholder="Enter project task desc" {...field}
                        className={form.formState.errors.description ? 'border-red-500' : ''}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Label htmlFor="status" className="text-right">
                        Status
                      </Label>
                      <Input placeholder="Enter project task status" {...field}
                        className={form.formState.errors.status ? 'border-red-500' : ''}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">
                  {isLoading ?
                    '...loading' :
                    'Save changes'
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
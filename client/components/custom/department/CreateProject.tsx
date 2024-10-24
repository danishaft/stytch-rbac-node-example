import { useStytchIsAuthorized } from '@stytch/nextjs/b2b'
import { createDeptProjectSchema, ICreateDeptProjectSchema } from "@/app/workspace/departments/[departmentId]/validations";
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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


interface DeptProjectFormProps {
  schema: typeof createDeptProjectSchema;
  defaultValues: ICreateDeptProjectSchema;
  onSubmit: (values: ICreateDeptProjectSchema) => void;
  isLoading?: boolean;
}

export function CreateDepartmentProject({schema, defaultValues, onSubmit, isLoading}: DeptProjectFormProps) {
  const {isAuthorized: canCreate} = useStytchIsAuthorized('department-project', 'create')
  // Define form
  const form = useForm<ICreateDeptProjectSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const handleSubmit = async (values: ICreateDeptProjectSchema) => {
    onSubmit(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!canCreate || isLoading} variant="outline" size={"sm"} className="bg-newPrimary/80 text-white hover:bg-newPrimary hover:text-white">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create department project</DialogTitle>
          <DialogDescription>
            Enter the details for the new department Project. Click create when you're done.
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
                      <Input placeholder="Enter department project name" {...field}
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
                      <Input placeholder="Enter department project desc" {...field}
                        className={form.formState.errors.description ? 'border-red-500' : ''}
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
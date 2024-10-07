import { createPublicProjectSchema, IcreatePublicProjectSchema } from "@/app/workspace/project/validation"
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
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"

interface ProjectFormProps {
  schema: typeof createPublicProjectSchema;
  defaultValues: IcreatePublicProjectSchema;
  onSubmit: (values: IcreatePublicProjectSchema) => void;
  isLoading?: boolean;
}

export function CreatePublicProject({defaultValues, isLoading, onSubmit, schema}: ProjectFormProps) {
  const form = useForm<IcreatePublicProjectSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  const handleSubmit = async (values: IcreatePublicProjectSchema) => {
    onSubmit(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"} className="bg-newPrimary/80 text-white hover:bg-newPrimary hover:text-white">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create public project</DialogTitle>
          <DialogDescription>
            Enter the details for the new Project. Click create when you're done.
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
                      <Input placeholder="Enter project name" {...field}
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
                      <Input placeholder="Enter project desc" {...field}
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
              name="members"
              render={({field}) => (
                <FormItem>
                  <Label htmlFor="members" className="text-right">
                    Manager
                  </Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a member" />
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
            />  */}
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
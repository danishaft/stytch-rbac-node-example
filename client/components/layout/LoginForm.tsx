"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ISignInSchema, signInSchema } from "@/app/(auth)/validation";


interface AuthFormProps {
  schema: typeof signInSchema;
  defaultValues: ISignInSchema;
  onSubmit: (values: ISignInSchema) => void;
  buttonText: string;
  success: string | null;
  errorMsg: string | null;
  isLoading: boolean
}

export function LoginForm({ schema, defaultValues, onSubmit, buttonText, success, errorMsg, isLoading }: AuthFormProps) {
  
  // Define form
  const form = useForm<ISignInSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });

  const handleSubmit = async (values: ISignInSchema) => {
      console.log(values)
      onSubmit(values);
  };

  if (success) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{success}</span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your email address..." {...field} className="h-12" />
              </FormControl>
              <FormDescription className="text-red-500">
                {errorMsg && errorMsg.replace(/_/g, " ")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="full" variant="primary">
          {isLoading ? 'Processing...' : buttonText}
        </Button>
      </form>
    </Form>
  );
}
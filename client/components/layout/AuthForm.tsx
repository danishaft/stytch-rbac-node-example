"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IAuthSchema, authSchema, defaultValues } from "@/app/(auth)/validation";
import { z } from "zod";
// import axios from 'axios';

interface AuthFormProps {
  authSchema: typeof authSchema;
  defaultValues: IAuthSchema;
  onSubmit: (values: IAuthSchema) => Promise<void>;
  buttonText: string;
}

export function AuthForm({ authSchema, defaultValues, onSubmit, buttonText }: AuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Define form
  const form = useForm<IAuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: defaultValues
  });

  const handleSubmit = async (values: IAuthSchema) => {
    // setIsLoading(true);
    // setSuccessMessage(null);
    // setErrorMessage(null);

//     try {
//       await onSubmit(values);
//       setSuccessMessage("Action successful! Please check your email.");
//       form.reset(); // Clear the form
//     } catch (error: any) {
//       setErrorMessage(error.message || "An error occurred. Please try again.");
//       console.error('Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
    console.log(values, onSubmit(values))
    setSuccessMessage('magic link sent')
  };

  if (successMessage) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{successMessage}</span>
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
              <FormDescription>
                {/* This is your public display name. */}
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
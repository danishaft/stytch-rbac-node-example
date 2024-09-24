"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ICreateOrgSchema, createOrgSchema } from "@/app/(auth)/validation";

interface AuthFormProps {
  schema: typeof createOrgSchema;
  defaultValues: ICreateOrgSchema;
  onSubmit: (values: ICreateOrgSchema) => void;
  buttonText: string;
  errorMsg?: string | null;
  isLoading?: boolean;
}

export function CreateOrgForm({ schema, defaultValues, onSubmit, buttonText, errorMsg, isLoading }: AuthFormProps) {

  // Define form
  const form = useForm<ICreateOrgSchema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });

  const handleSubmit = async (values: ICreateOrgSchema) => {
    console.log(values);
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} className="h-12" />
              </FormControl>
              <FormDescription className="text-red-500">
                {/* {errorMsg && errorMsg.replace(/_/g, " ")} */}
                {form.formState.errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">{form.formState.errors.firstName.message}</p>
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} className="h-12" />
              </FormControl>
              <FormDescription className="text-red-500">
                {/* {errorMsg && errorMsg.replace(/_/g, " ")} */}
                {form.formState.errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">{form.formState.errors.lastName.message}</p>
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workspaceName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your workspace name" {...field} className="h-12" />
              </FormControl>
              <FormDescription className="text-red-500">
                {/* {errorMsg && errorMsg.replace(/_/g, " ")} */}
                {form.formState.errors.workspaceName && (
                  <p className="mt-2 text-sm text-red-600">{form.formState.errors.workspaceName.message}</p>
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button  type="submit" size="full" variant="primary">
          {isLoading ? 'Processing...' : buttonText}
        </Button>
      </form>
    </Form>
  );
}
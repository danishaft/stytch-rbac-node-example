"use client"
import { z } from "zod"
import { Regex } from "../utils"

export const signInValues = {
    email: "",
};

export const signInSchema = z.object({
  email: z.string().regex(Regex.isEmail, "please enter a valid email"),
});

export type ISignInSchema = z.infer<typeof signInSchema>;

export const createOrgValues = {
  firstName: "",
  lastName: "",
  workspaceName: "",
}
export const createOrgSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  workspaceName: z.string().min(1)
})

export type ICreateOrgSchema = z.infer<typeof createOrgSchema>;

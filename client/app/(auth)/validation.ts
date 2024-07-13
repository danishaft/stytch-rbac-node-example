"use client"
import { z } from "zod"
import { Regex } from "../utils"

export const defaultValues = {
    email: "",
};

export const authSchema = z.object({
  email: z.string().regex(Regex.isEmail, "please enter a valid email"),
});

export type IAuthSchema = z.infer<typeof authSchema>;

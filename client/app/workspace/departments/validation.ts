"use client"
import { z } from "zod"

export const createDeptValues = {
    name: '',
    description: '',
    slug: '',
    // managerId: '',
}
export const createDeptSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().min(1).toUpperCase(),
  // managerId: z.string()
})

export type ICreateDeptSchema = z.infer<typeof createDeptSchema>;
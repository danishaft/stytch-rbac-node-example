"use client"
import { z } from "zod"

export const createDeptProjectValues = {
    name: '',
    description: ''
}
export const createDeptProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
})

export type ICreateDeptProjectSchema = z.infer<typeof createDeptProjectSchema>;
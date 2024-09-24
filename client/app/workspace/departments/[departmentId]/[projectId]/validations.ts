"use client"
import { title } from "process";
import { z } from "zod"

export const createDProjectTaskValues = {
    title: '', 
    status: '', 
    description: ''
}
export const createDProjectTaskSchema = z.object({
    title: z.string().min(1),
    status: z.string(),
    description: z.string().min(1)
})

export type ICreateDProjectTaskSchema = z.infer<typeof createDProjectTaskSchema>;
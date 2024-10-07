"use client"
import { z } from "zod"

export const createProjectValues = {
    name: '',
    description: ''
}
export const createPublicProjectValues = {
  name: '',
  description: '',
  members: []
}


export const createProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
})


export const createPublicProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  members: z.any().array()
})

export type ICreateProjectSchema = z.infer<typeof createProjectSchema>;

export type IcreatePublicProjectSchema = z.infer<typeof createPublicProjectSchema>


export const createProjectTaskValues = {
  title: '',
  description: '',
  status: '',
}
export const createProjectTaskSchema = z.object({
  title: z.string().min(1), 
  status: z.string(),
  description: z.string().min(1)
})

export type ICreateProjectTaskSchema = z.infer<typeof createProjectTaskSchema>;
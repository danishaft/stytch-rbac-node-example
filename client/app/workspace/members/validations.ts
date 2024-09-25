"use client"
import { z } from "zod"

export const inviteToOrgValues = {
    email: '',
    departmentId: '',
}
export const inviteToOrgSchema = z.object({
  email: z.string().email(),
  departmentId: z.string().min(1)
})

export type IinviteToOrgSchema = z.infer<typeof inviteToOrgSchema>;
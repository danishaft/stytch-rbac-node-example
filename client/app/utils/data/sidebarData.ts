'use client'
import {  EnvelopeClosedIcon, GearIcon, PlusIcon } from "@radix-ui/react-icons";
import { SideBarType } from "../types/Types";

export const sideBarData: SideBarType[] = [
    {
      title: "Inbox",
      href: "/workspace/inbox",
      icon: EnvelopeClosedIcon,
    },
    {
        title: "Settings",
        href: "/",
        icon: GearIcon,
    },
    {
      title: "Workspace",
      children: [
        {
          title: "Projects",
          href: "/workspace/projects",
        },
        {
          title: "Departments",
          href: "/workspace/departments",
        },
      ],
    },
    {
      title: "Department",
      children: [
        {
          title: "Tasks",
          href: "/workspace/departments/tasks",
        },
        {
          title: "Projects",
          href: "/workspace/departments/projects",
        },
      ],
    },
  ]
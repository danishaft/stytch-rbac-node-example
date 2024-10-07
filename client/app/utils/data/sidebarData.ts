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
          href: "/workspace/project/shared",
        },
        {
          title: "Departments",
          href: "/workspace/departments",
        },
      ],
    },
    {
      title: "Private",
      children: [
        {
          title: "Projects",
          href: "/workspace/project/personal",
        },
        // {
        //   title: "Tasks",
        //   href: "/workspace/project/personal/tasks",
        // },
      ],
    },
]
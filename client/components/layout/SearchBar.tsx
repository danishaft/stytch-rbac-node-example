import React from 'react'
import {
    CalendarIcon,
    EnvelopeClosedIcon,
    FaceIcon,
    GearIcon,
    PersonIcon,
    RocketIcon,
  } from "@radix-ui/react-icons"
   
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"

export const SearchBar = () => {
  return (
    <div className="flex items-center min-w-fit w-full md:w-2/3 md:pl-0 pl-2">
        <Command className="rounded-lg border shadow-md w-full h-fit">
            <CommandInput placeholder="Type a command or search..." />
        </Command>
    </div>
  )
}

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon, ChevronDownIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Workspace {
  name: string;
  href: string;
}

const mockWorkspaces: Workspace[] = [
  { name: "Workspace 1", href: "#" },
  { name: "Workspace 2", href: "#" },
  { name: "Workspace 3", href: "#" },
];

export function Dropdown() {
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);

  useEffect(() => {
    // Simulate setting the current workspace
    const initialWorkspace = mockWorkspaces[0];
    setCurrentWorkspace(initialWorkspace);
  }, []);

  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={'icon'}>
            <ChevronDownIcon  className=" h-4 w-4 shrink-0" aria-hidden="true"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>workspace name</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Workspace Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>Invite Members</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Switch Workspace</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuLabel>danielejeh2019@gmail.com</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {mockWorkspaces.map((workspace, index) => (
                    <DropdownMenuItem key={index} asChild>
                      <Link href={workspace.href}>
                        {workspace.name}
                        {currentWorkspace && currentWorkspace.name === workspace.name && (
                          <DropdownMenuShortcut>
                            <CheckIcon />
                          </DropdownMenuShortcut>
                        )}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={'/join'}>Create or join a workspace..</Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

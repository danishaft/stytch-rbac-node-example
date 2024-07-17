import React from "react"
import { Button } from "../button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip"

interface TooltipButtonProps {
    icon: React.ComponentType<any>
    tip: string
}

export const TooltipButton: React.FC<TooltipButtonProps> = ({icon: Icon, tip}) => {
  return (
    <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size={"icon"} variant={"tooltip"}><Icon/> </Button>
                </TooltipTrigger>
                <TooltipContent side={"bottom"} className="bg-light-primary text-newPrimary border-light-primary border">
                    <p>{tip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </>
  )
}

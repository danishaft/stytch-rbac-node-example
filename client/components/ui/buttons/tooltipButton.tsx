import React from "react"
import { Button } from "../button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip"

interface TooltipButtonProps {
    icon: React.ComponentType<any>
    tip: string
    disabled?: boolean
    onClick?: () => void

}

export const TooltipButton: React.FC<TooltipButtonProps> = ({icon: Icon, tip, disabled, onClick}) => {
  return (
    <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button disabled={disabled} size={"icon"} variant={"tooltip"} onClick={onClick}><Icon/> </Button>
                </TooltipTrigger>
                <TooltipContent side={"bottom"} className="bg-light-primary text-newPrimary border-light-primary border">
                    <p>{tip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </>
  )
}

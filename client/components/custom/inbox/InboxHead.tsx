
import { TooltipButton } from "@/components/ui/buttons/tooltipButton"
import { DashboardIcon, MixerHorizontalIcon, TrashIcon } from "@radix-ui/react-icons"

export const InboxHead = () => {
  return (
        <div className="flex items-center justify-between gap-5">
            <TooltipButton icon={MixerHorizontalIcon } tip="Filter"/>
            <TooltipButton icon={TrashIcon } tip="Clear"/>
        </div>
  )
}

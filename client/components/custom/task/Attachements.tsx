import { DrawingPinFilledIcon, PlusIcon } from "@radix-ui/react-icons"
import Link from "next/link"


export const Attachements = () => {
  return (
    <div className="border-b-2 pb-2">
        <h4 className="page-text-3 mb-2">Attachments</h4>
        <div className="mb-2 items-center gap-1">
            <DrawingPinFilledIcon/>
            <Link href={'#'}>Document Links</Link>
        </div>
        <div className="flex items-center gap-1 mb-2">
            <PlusIcon/>
            <p>Add Attachments</p>
        </div>
    </div>
  )
}

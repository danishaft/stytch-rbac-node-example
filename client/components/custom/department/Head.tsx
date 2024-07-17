import { CheckIcon, HomeIcon, LightningBoltIcon } from "@radix-ui/react-icons"

export const DepartmentHead = ({name}: {name: string}) => {
  return (
    <div className="flex items-center space-x-3 ">
      <HomeIcon className="size-4 text-newPrimary" />
      <h3 className="text-lg font-semibold text-dark">{name}</h3>
      <div className="flex items-center rounded-sm px-1 bg-sec-bg text-dark1 border-dark1 bg- border text-[10px] font-medium"><CheckIcon className="size-4"/><p>Joined</p></div>
    </div>
  )
}

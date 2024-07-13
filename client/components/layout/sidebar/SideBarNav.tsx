import { SideBarType } from '@/app/utils/types/Types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { SideBarFooter } from './SideBarFooter'


interface MainNavProps {
    items: SideBarType[]
}

export const SideBarNav: React.FC<MainNavProps> = ({ items }) => {
  return (
    <>
        {items?.length ? (
            <nav className="flex-1 flex flex-col space-y-2 p-4 gap-6">
                {items?.map((item, index) =>
                    item.children ? (
                    <Accordion key={index} type="single" collapsible>
                        <AccordionItem value={item.title} className="border-b-0">
                            <AccordionTrigger
                                className={cn(
                                buttonVariants({
                                    size: "sm",
                                    variant: "ghost",
                                }),
                                "justify-between",
                                item.disabled && "cursor-not-allowed opacity-80"
                                )}
                            >
                                <div className="flex items-center justify-start">
                                    {item.icon && (
                                        <item.icon
                                        className="mr-2 h-4 w-4 shrink-0"
                                        aria-hidden="true"
                                        />
                                    )}
                                    {item.title}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="ml-7 flex flex-col space-y-1">
                                    {item.children.map((child, index) => (
                                        <Link
                                            key={index}
                                            href={child.href || "/"}
                                            className={cn(
                                                buttonVariants({
                                                size: "sm",
                                                variant: "ghost",
                                                }),
                                                "justify-start",
                                                child.disabled && "cursor-not-allowed opacity-80"
                                            )}
                                        >
                                        {child.title}
                                        </Link>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    ) : (
                    item.href && (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                buttonVariants({
                                size: "sm",
                                variant: "ghost",
                                }),
                                "justify-start",
                                item.disabled && "cursor-not-allowed opacity-80"
                            )}
                        >
                            {item.icon && (
                                <item.icon
                                className="mr-2 h-4 w-4 shrink-0"
                                aria-hidden="true"
                                />
                            )}
                            {item.title}
                        </Link>
                    )
                    )
                )}
                <SideBarFooter/>
            </nav>
            ) : null}
    </>
  )
}

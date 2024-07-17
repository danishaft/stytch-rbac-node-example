import { AssignButton } from '@/components/ui/buttons/assignButton'
import React from 'react'

export const Comments = ({assignee}: {assignee: any}) => {
  return (
    <div className='py-2'>
        <div className='flex items-center gap-2 mb-2'>
            <AssignButton/>
            <p><span className='font-medium'>{assignee}</span> commented on<span className='font-medium'> 24 march 2023</span> at <span className='font-medium'>18:59pm</span></p>
        </div>
        <ul className='list-disc pl-4 space-y-2'>
            <li>Technical training - life cycle hook, viewEncapsulation, Data sharing</li>
            <li>work on project common component integration (Navbar-Sidebar & Profile Section)</li>
            <li>work on Local setup issue on Github</li>
            <li>work on project common component integration (Navbar-Sidebar & Profile Section)</li>
        </ul>
    </div>
  )
}

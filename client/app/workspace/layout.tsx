'use client';

import { NavBar } from '@/components/layout/NavBar';
import { SideBar } from '@/components/layout/sidebar/SideBar';
import { useState } from 'react';
import { useAuth } from '../utils';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const {isAuthenticated, loading} = useAuth();
  if(!isAuthenticated) return null;
  return (
      <div className='flex min-h-screen h-full'>
        <SideBar isOpen={isOpen} />
        <div className="flex-1 h-full md:ml-[15em]">
          <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className='p-4 h-full'>
            {children}
          </div>
        </div>
      </div>
    )
}


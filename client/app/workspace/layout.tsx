'use client';

import { NavBar } from '@/components/layout/NavBar';
import { SideBar } from '@/components/layout/sidebar/SideBar';
import { useState } from 'react';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='flex min-h-screen'>
      <SideBar isOpen={isOpen} />
      <div className="flex-1 h-full md:ml-[15em]">
        <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className='p-4'>
          {children}
        </main>
      </div>
    </div>
  );
}

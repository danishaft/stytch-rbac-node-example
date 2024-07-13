// 'use client'
// import { SideBarNav } from './SideBarNav';
// import { SideBarHeader } from './SideBarHeader';
// import { sideBarData } from '@/app/utils/data/sidebarData';
// import { UserProfile } from '../UserProfile';

// interface SideBarProps {
//   isOpen: boolean;
// }

// export const SideBar: React.FC<SideBarProps> = ({isOpen}) => {
//   return (
//     <div className={`fixed top-16 md:top-0 left-0 w-[15em] min-w-[15em]  h-[calc(100vh-4rem)] md:h-screen bg-white border-r z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 overflow-hidden`}>
//       <div className="flex flex-col h-full overflow-y-auto">
//         <SideBarHeader/>
//         <div className="flex-grow overflow-y-auto">
//           <SideBarNav items={sideBarData}/>
//         </div>
//         <div className="md:hidden flex items-start justify-center mt-auto border-t py-4">
//           <UserProfile/>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { SideBarNav } from './SideBarNav';
import { SideBarHeader } from './SideBarHeader';
import { sideBarData } from '@/app/utils/data/sidebarData';
import { UserProfile } from '../UserProfile';

interface SideBarProps {
  isOpen: boolean;
}

export const SideBar: React.FC<SideBarProps> = ({ isOpen }) => {
  return (
    <div className={`fixed top-16 md:top-0 left-0 w-[15em] min-w-[15em] h-[calc(100vh-4rem)] md:h-screen bg-white border-r z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 overflow-hidden`}>
      <div className="flex flex-col h-full overflow-y-auto">
        <SideBarHeader />
        <div className="flex-grow overflow-y-auto">
          <SideBarNav items={sideBarData} />
        </div>
        <div className="md:hidden flex items-start justify-center mt-auto border-t py-4">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

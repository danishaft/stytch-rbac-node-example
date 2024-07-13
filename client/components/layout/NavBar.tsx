// import { UserProfile } from './UserProfile'
// import { BellIcon, CalendarIcon, ViewVerticalIcon } from '@radix-ui/react-icons'
// import { SearchBar } from './SearchBar'

// interface NavBarProps {
//   isOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export const NavBar: React.FC<NavBarProps> = ({ isOpen, setIsOpen }) => {
//   return (
//     <>
//       <nav className="fixed top-0 right-0 left-0 md:left-[15em] flex justify-between items-center h-16 p-4 border-b bg-white z-40">
//         <button className="md:hidden flex-shrink-0" onClick={() => setIsOpen(!isOpen)}>
//           <ViewVerticalIcon />
//         </button>
//         <div className="flex-grow mx-4">
//           <SearchBar />
//         </div>
//         <div className="flex items-center gap-4 flex-shrink-0">
//           <CalendarIcon className='text-dark2' />
//           <BellIcon className='text-dark2' />
//           <div className="hidden md:flex">
//             <UserProfile />
//           </div>
//         </div>
//       </nav>
//       {/* <div className="h-16 md:hidden"></div> Spacer only for mobile */}
//     </>
//   )
// }




import { UserProfile } from './UserProfile';
import { BellIcon, CalendarIcon, ViewVerticalIcon } from '@radix-ui/react-icons';
import { SearchBar } from './SearchBar';

interface NavBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavBar: React.FC<NavBarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <nav className="fixed top-0 right-0 left-0 md:left-[15em] flex justify-between items-center h-16 p-4 border-b bg-white z-40">
        <button className="md:hidden flex-shrink-0" onClick={() => setIsOpen(!isOpen)}>
          <ViewVerticalIcon />
        </button>
        <div className="flex-grow mx-4">
          <SearchBar />
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <CalendarIcon className='text-dark2' />
          <BellIcon className='text-dark2' />
          <div className="hidden md:flex">
            <UserProfile />
          </div>
        </div>
      </nav>
      <div className="h-16"></div> {/* Spacer for mobile to ensure content starts below navbar */}
    </>
  );
};

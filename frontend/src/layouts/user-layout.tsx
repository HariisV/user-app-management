import { IconMenu2 } from '@tabler/icons-react';

import LOGO from '@/assets/logo.png';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/auth-store';
import { motion, AnimatePresence } from 'framer-motion';
import moment from 'moment/min/moment-with-locales';

interface LayoutProps {
  children: React.ReactNode;
}
import 'moment/min/moment-with-locales';
import SideMenu from '../components/side-menu';

export default function UserLayout({ children }: LayoutProps) {
  moment.locale('id');

  const [showMenu, setShowMenu] = useState(false);
  const account = useAuthStore((state) => state.user);

  const location = useLocation();

  const toggleDropdown = () => {
    setShowMenu(showMenu ? false : true);
  };

  const [menuOpened, setMenuOpened] = useState<number[]>([]);

  if (!account) return null;

  return (
    <div className=" bg-[#F5F5F5]  scroll-smooth">
      <div className="flex flex-row justify-between md:hidden bg-white p-5">
        <div className="logo flex flex-row justify-center items-center gap-x-2">
          <img className="w-auto h-7" src={LOGO} alt="" />
        </div>
        <div className="flex items-center gap-5">
          <button
            id="btn-dropdown"
            onClick={toggleDropdown}
            className="flex flex-row items-center p-2 border border-gray-300 rounded-full"
          >
            <IconMenu2 />
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-start">
        {showMenu && (
          <SideMenu
            classNames="md:hidden"
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />
        )}
        <SideMenu
          classNames="hidden md:flex"
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />

        <div
          className={`flex-auto w-screen ${showMenu && 'hidden'} mx-4`}
          style={{
            width: 'calc(100% - 20%)',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

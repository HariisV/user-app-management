import LOGO from '@/assets/logo.png';

import { Link } from 'react-router-dom';
import { menuListBottom, menuList } from '@/const/menu-list';
import checkRouteActive from '@/utils/checkRouteActive';

type MenuItem = {
  link: string;
  title: string;
  icon: JSX.Element;
  replace?: boolean;
  className?: string;
};

export default function SideMenu({ classNames }: any) {
  return (
    <aside
      className={`flex flex-col w-full md:w-[30%] md:max-w-[260px] py-0 h-[85vh] md:h-screen px-5 md:py-8 overflow-y-auto bg-white rounded-xl border-r rtl:border-r-0 rtl:border-l sticky top-0 ${classNames}`}
    >
      <Link to="/" className="hidden md:flex items-center justify-center gap-3">
        <img className=" w-14" src={LOGO} alt="" />
      </Link>

      <div className="flex flex-col justify-between h-full mt-0">
        <nav className="-mx-3 space-y-1 mt-14 ">
          {menuList.map((menu: any) => {
            const menuItem = menu.pages.map((page: MenuItem) => (
              <Link
                key={page.link}
                className={`flex items-center group !mb-2 px-3 py-2 text-black justify-between transition-colors duration-300 transform rounded-lg
                  hover:icon-actives 
                  ${
                    checkRouteActive(page.link, location.pathname) &&
                    ' icon-active'
                  }`}
                to={page.link}
              >
                <div className="flex">
                  <span>{page.icon}</span>
                  <span className={`mx-2 text-sm font-medium self-center`}>
                    {page.title}
                  </span>
                </div>
              </Link>
            ));

            return menuItem;
          })}
        </nav>
        <div className="">
          {menuListBottom.map((menu: any) => {
            const menuItem = menu.pages.map((page: MenuItem) => (
              <Link
                key={page.link}
                replace={page.replace}
                className={`flex items-center group !mb-2 px-3 py-1.5 text-black justify-between transition-colors duration-300 transform rounded-lg
                  ${page.title !== '프로그램' ? 'hover:icon-actives' : ''} 
                  ${
                    checkRouteActive(page.link, location.pathname) &&
                    ' icon-active'
                  } ${page.className}`}
                to={page.link}
              >
                <div className="flex">
                  <span>{page.icon}</span>
                  <span className="mx-2 text-sm font-medium self-center">
                    {page.title}
                  </span>
                </div>
              </Link>
            ));
            return menuItem;
          })}
        </div>
      </div>
    </aside>
  );
}

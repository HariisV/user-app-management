import { IconHome2, IconLogout, IconSettings2 } from '@tabler/icons-react';

export const menuList = [
  {
    pages: [
      {
        icon: <IconHome2 className="w-5" />,
        title: 'Dashboard',
        link: '/',
      },
    ],
  },
];

export const menuListBottom = [
  {
    pages: [
      {
        icon: <IconSettings2 className="w-5 text-[#7D7D7D]" />,
        title: 'Settings',
        link: '/profile',
      },
      {
        icon: <IconLogout className="w-5 text-danger" />,
        title: 'Logout',
        link: '/auth/logout',
        replace: true,
        className: 'text-danger',
      },
    ],
  },
];

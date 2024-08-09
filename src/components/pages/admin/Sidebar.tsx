'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiSolidCustomize } from 'react-icons/bi';
import { FaHome } from 'react-icons/fa';
import { GiDiploma } from 'react-icons/gi';
import { IoMdSettings } from 'react-icons/io';

const menuSidebar = [
  { name: 'Home', url: '/admin', icon: <FaHome className="text-3xl" /> },
  { name: 'Mint NFT', url: '/admin/mintnft', icon: <GiDiploma className="text-3xl" /> },
  {
    name: 'Customized ',
    url: '/admin/customized',
    icon: <BiSolidCustomize className="text-3xl" />,
  },
];

const Sidebar = () => {
  const pathname = usePathname() || '/admin';

  return (
    <div className="backgroundCustomSidebar fixed left-0 top-0 z-50 flex h-full w-64 flex-col justify-between px-3 shadow-md">
      <div>
        <div className="flex items-center justify-center px-3 py-4">
          <h1 className="text-4xl font-bold">Syncible</h1>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            {menuSidebar.map((item) => {
              const isActive = pathname === item.url;
              return (
                <li className="text-lg" key={item.name}>
                  <Link
                    href={item.url}
                    className={`flex items-center gap-4 rounded-xl px-4 py-4 font-bold ${isActive ? 'bg-purple-950/30' : 'hover:bg-purple-800/30'}`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="mb-3 text-lg">
        <Link
          href={'/admin/setting'}
          className={`flex items-center gap-4 rounded-xl px-4 py-4 font-bold hover:bg-purple-800/30`}
        >
          <IoMdSettings className="text-3xl" />
          Setting
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

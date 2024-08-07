'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaRegFolderOpen } from 'react-icons/fa';
import { GiDiploma } from 'react-icons/gi';

const menuSidebar = [
  { name: 'My Collection', url: '/admin', icon: <FaRegFolderOpen className="text-3xl" /> },
  { name: 'NFT Diploma', url: '/admin/experience', icon: <GiDiploma className="text-3xl" /> },
];

const Sidebar = () => {
  const pathname = usePathname() || '/admin';

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-64 bg-[#F5F7FF] px-3 text-black shadow-md">
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
                  className={`flex items-center gap-4 rounded-xl px-4 py-4 font-bold ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
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
  );
};

export default Sidebar;

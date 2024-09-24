'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiCustomize } from 'react-icons/bi';
import { BiHome } from 'react-icons/bi';
import { BiFile } from 'react-icons/bi';
import { BiCog } from 'react-icons/bi';
import { GrCertificate } from 'react-icons/gr';

import Modal from './Modal';

const menuSidebar = [
  { name: 'Trang Chủ', url: '/admin', icon: <BiHome className="text-2xl" /> },
  {
    name: 'Tùy Chỉnh Mẫu',
    url: '/admin/customized',
    icon: <BiFile className="text-2xl" />,
  },
  {
    name: 'Quản lý Chứng Chỉ',
    url: '/admin/collection',
    icon: <BiCustomize className="text-2xl" />,
  },
  { name: 'Tạo Chứng Chỉ Số', url: '/admin/mintnft', icon: <GrCertificate className="text-2xl" /> },
];

const Sidebar = () => {
  const pathname = usePathname() || '/admin';
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Active
  const baseLinkClasses =
    'flex items-center gap-4 rounded-xl px-4 py-4 font-bold text-gray-500 transition-colors duration-300';
  const activeLinkClasses =
    'bg-gradient-to-r from-[#a2f2e7] via-[#a2f2e7]/70 to-[#ffe4c2] text-gray-700';
  const inactiveLinkClasses =
    'hover:bg-gradient-to-r from-[#a2f2e7] via-[#a2f2e7]/70 to-[#ffe4c2] hover:text-gray-700';

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col justify-between bg-white px-3 text-gray-800 shadow-md">
      <div>
        <div className="flex items-center justify-start p-4">
          <Link href={'/admin'} className="h-auto w-auto">
            <Image
              src={'/SyncibleAdmin.png'}
              alt="logo"
              className="h-auto w-full"
              width={140}
              height={30}
            />
          </Link>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            {menuSidebar.map((item) => {
              const isActive = pathname.replace(/^\/(en|vi)/, '') === item.url;

              return (
                <li className="text-base" key={item.name}>
                  {item.name !== 'Tạo Chứng Chỉ Số' ? (
                    <Link
                      href={item.url}
                      className={`${baseLinkClasses} ${
                        isActive ? activeLinkClasses : inactiveLinkClasses
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ) : (
                    <div
                      onClick={() => setIsModalOpen(true)}
                      className={`${baseLinkClasses} ${
                        isActive ? activeLinkClasses : inactiveLinkClasses
                      } cursor-pointer`}
                    >
                      {item.icon}
                      {item.name}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
      <div className="mb-3 text-base">
        {/* <Link
          href={'/admin/setting'}
          className={`flex items-center gap-4 rounded-lg from-[#a2f2e7] via-[#a2f2e7]/70 to-[#ffe4c2] p-4 px-4 py-4 font-bold text-gray-500 hover:bg-gradient-to-r hover:text-gray-700`}
        >
          <BiCog className="text-2xl" />
          Cài đặt
        </Link> */}
      </div>
    </div>
  );
};

export default Sidebar;

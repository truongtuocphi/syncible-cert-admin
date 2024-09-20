'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiSolidCustomize } from 'react-icons/bi';
import { FaHome } from 'react-icons/fa';
import { GiDiploma } from 'react-icons/gi';
import { IoMdSettings } from 'react-icons/io';
import { MdCollectionsBookmark } from 'react-icons/md';

import Modal from './Modal';

const menuSidebar = [
  { name: 'Trang Chủ', url: '/admin', icon: <FaHome className="text-2xl" /> },
  {
    name: 'Tùy Chỉnh Mẫu',
    url: '/admin/customized',
    icon: <BiSolidCustomize className="text-2xl" />,
  },
  {
    name: 'Quản lý Chứng Chỉ',
    url: '/admin/collection',
    icon: <MdCollectionsBookmark className="text-2xl" />,
  },
  { name: 'Tạo Chứng Chỉ Số', url: '/admin/mintnft', icon: <GiDiploma className="text-2xl" /> },
];

const Sidebar = () => {
  const pathname = usePathname() || '/admin';
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col justify-between bg-white px-3 text-gray-800 shadow-md">
      <div>
        <div className="flex items-center justify-center px-3 py-4">
          <Link href={'/admin'} className="h-auto w-auto">
            <Image
              src={'/SyncibleAdmin.png'}
              alt="logo"
              style={{ width: '100%', height: 'auto' }}
              width={140}
              height={30}
            />
          </Link>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            {menuSidebar.map((item) => {
              const isActive = pathname === item.url;
              return (
                <li className="text-base" key={item.name}>
                  {item.name !== 'Tạo Chứng Chỉ Số' ? (
                    <Link
                      href={item.url}
                      className={`flex items-center gap-4 rounded-xl px-4 py-4 font-bold ${isActive ? 'bg-[#93def7]' : 'hover:bg-[#93def7]'}`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ) : (
                    <div
                      onClick={() => setIsModalOpen(true)}
                      className={`flex cursor-pointer items-center gap-4 rounded-xl px-4 py-4 font-bold ${isActive ? 'bg-[#93def7]' : 'hover:bg-[#93def7]'}`}
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
        <Link
          href={'/admin/setting'}
          className={`flex items-center gap-4 rounded-xl px-4 py-4 font-bold hover:bg-[#93def7]`}
        >
          <IoMdSettings className="text-2xl" />
          Cài đặt
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

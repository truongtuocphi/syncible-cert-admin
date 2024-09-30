'use client';

import { useState } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BiCustomize } from 'react-icons/bi';
import { BiHome } from 'react-icons/bi';
import { BiFile } from 'react-icons/bi';
import { GrCertificate } from 'react-icons/gr';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

import Modal from './Modal';

const menuSidebar = [
  { name: 'home', url: '/admin', icon: <BiHome className="text-2xl 2xl:text-3xl" /> },
  {
    name: 'customizeTemplate',
    url: '/admin/customized',
    icon: <BiCustomize className="text-2xl 2xl:text-3xl" />,
  },
  {
    name: 'certificateManagement',
    url: '/admin/collection',
    icon: <BiFile className="text-2xl 2xl:text-3xl" />,
  },
  {
    name: 'createDigitalCertificate',
    url: '/admin/mintnft',
    icon: <GrCertificate className="text-2xl 2xl:text-3xl" />,
  },
];

const Sidebar = () => {
  const pathname = usePathname() || '/admin';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = useTranslations('Dapp');

  // Active
  const baseLinkClasses =
    'flex items-center gap-4 rounded-xl px-4 py-4 font-bold text-gray-500 transition-colors duration-300';
  const activeLinkClasses =
    'bg-gradient-to-r from-[#a2f2e7] via-[#a2f2e7]/70 to-[#ffe4c2] text-gray-700';
  const inactiveLinkClasses =
    'hover:bg-gradient-to-r from-[#a2f2e7] via-[#a2f2e7]/70 to-[#ffe4c2] hover:text-gray-700';

  console.log(t(`sideBar.createDigitalCertificate`) !== 'Tạo Chứng Chỉ');

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-80 flex-col justify-between bg-white px-3 text-gray-800 shadow-md 2xl:w-96">
      <div>
        <div className="flex items-center justify-start p-4">
          <Link href={'/admin'} className="h-auto w-auto">
            <Image
              src={'/SyncibleAdmin.png'}
              alt="logo"
              className="h-auto w-full md:h-auto md:w-32 2xl:h-11 2xl:w-40"
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
                <li className="text-base 2xl:text-lg" key={item.name}>
                  {t(`sideBar.${item.name}`) !== 'Create Digital Certificate' &&
                  t(`sideBar.${item.name}`) !== 'Tạo Chứng Chỉ' ? (
                    <Link
                      href={item.url}
                      className={`${baseLinkClasses} ${
                        isActive ? activeLinkClasses : inactiveLinkClasses
                      }`}
                    >
                      {item.icon}
                      {t(`sideBar.${item.name}`)}
                    </Link>
                  ) : (
                    <div
                      onClick={() => setIsModalOpen(true)}
                      className={`${baseLinkClasses} ${
                        isActive ? activeLinkClasses : inactiveLinkClasses
                      } cursor-pointer`}
                    >
                      {item.icon}
                      {t(`sideBar.${item.name}`)}
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

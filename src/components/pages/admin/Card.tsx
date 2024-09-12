'use client';

import { useState } from 'react';

import Link from 'next/link';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';

import Modal from './Modal';

export default function Card({ data }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-xl bg-white px-6 py-8 shadow-xl shadow-gray-300">
      <div>
        <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-b from-[#79d7f7] via-[#baecfa] to-[#e1f8f8] shadow-md shadow-[#b3e6f7]">
          {data.icon}
        </div>

        <div className="mt-10 flex flex-col gap-6">
          <h2 className="text-lg font-bold text-gray-800">{data.title}</h2>
          <div className="w-1/5 border-[2px] border-[#b3e6f7] shadow-md shadow-[#b3e6f7]"></div>
          <p className="text-sm text-gray-500">{data.des}</p>
        </div>
      </div>

      {data.title !== 'Tạo chứng chỉ số' ? (
        <Link href={data.link}>
          <ButtonPrimary className="mt-5 w-full bg-primary">{data.titleButton}</ButtonPrimary>
        </Link>
      ) : (
        <ButtonPrimary
          onClick={() => setIsModalOpen(true)}
          className="mt-5 w-full bg-primary text-white"
        >
          {data.titleButton}
        </ButtonPrimary>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

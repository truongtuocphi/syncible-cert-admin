'use client';

import { useState } from 'react';

import Link from 'next/link';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';

import Modal from './Modal';

export default function Card({ data }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-3xl border-[0.5px] border-gray-200 bg-white px-6 py-8">
      <div>
        <div className="flex size-14 items-center justify-center rounded-full border-[0.5px] border-gray-200">
          {data.icon}
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-gray-800">{data.title}</h2>
          <p className="text-sm text-gray-500">{data.des}</p>
        </div>
      </div>

      {data.title !== 'Tạo chứng chỉ' ? (
        <Link href={data.link}>
          <ButtonPrimary className="mt-5 w-full bg-primary-50 text-white">
            {data.titleButton}
          </ButtonPrimary>
        </Link>
      ) : (
        <ButtonPrimary
          onClick={() => setIsModalOpen(true)}
          className="mt-5 w-full bg-primary-50 text-white"
        >
          {data.titleButton}
        </ButtonPrimary>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

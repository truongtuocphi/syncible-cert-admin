'use client';

import { ReactNode, useState } from 'react';

import Link from 'next/link';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';

import Modal from './Modal';

import { useTranslations } from 'next-intl';

interface IData {
  title: string;
  des: string;
  icon: ReactNode;
  titleButton: string;
  link: string;
}

interface IProps {
  data: IData;
  numberIndex: number;
}

export default function Card({ data, numberIndex }: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = useTranslations('Dapp.listCard');

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-3xl border-[0.5px] border-gray-200 bg-white px-6 py-8 2xl:px-8 2xl:py-10">
      <div>
        <div className="flex size-14 items-center justify-center rounded-full border-[0.5px] border-gray-200 2xl:size-20">
          {data.icon}
        </div>

        <div className="mt-5 flex flex-col gap-3 2xl:gap-5">
          <h2 className="text-2xl font-bold text-gray-800 2xl:text-3xl">
            {t(`card_${numberIndex}.${data.title}`)}
          </h2>
          <p className="text-sm text-gray-500 2xl:text-base">
            {t(`card_${numberIndex}.${data.des}`)}
          </p>
        </div>
      </div>

      {t(`card_${numberIndex}.${data.title}`) !== 'Create Digital Certificate' &&
      t(`card_${numberIndex}.${data.title}`) !== 'Tạo Chứng Chỉ' ? (
        <Link href={data.link}>
          <ButtonPrimary className="mt-5 w-full bg-primary-50 text-white">
            {t(`card_${numberIndex}.${data.titleButton}`)}
          </ButtonPrimary>
        </Link>
      ) : (
        <ButtonPrimary
          onClick={() => setIsModalOpen(true)}
          className="mt-5 w-full bg-primary-50 text-white"
        >
          {t(`card_${numberIndex}.${data.titleButton}`)}
        </ButtonPrimary>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

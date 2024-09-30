'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import Loading from '@/components/common/loading/Loading';
import ContractData from '@/components/pages/admin/ContractData';
import CopyAddressButton from '@/components/pages/admin/CopyAddressButton';
import { CollectionData } from '@/types/function';
import fetchDataCollectionById from '@/utils/fetchDataCollectionById';
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';
import { useTranslations } from 'next-intl';

export default function CollectionDetail({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<CollectionData | null>(null);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const slugPost = params.slug;

  const t = useTranslations('Dapp.collectionDetail');

  useEffect(() => {
    const getData = async () => {
      const result = await fetchDataCollectionById(slugPost);
      setData(result);
    };

    getData();
  }, [slugPost]);

  const handleItemsCountChange = (count: number) => {
    setItemsCount(count);
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <Breadcrumb displayName={data.displayName} />
      </div>
      <div className="flex items-center gap-2">
        <Link href={`/admin/collection/`}>
          <ButtonPrimary className="rounded-lg py-2">
            <FaArrowLeft className="text-xl text-white" />
          </ButtonPrimary>
        </Link>
        <div className="text-xl font-semibold text-gray-500">{t('buttonBack')}</div>
      </div>

      <div className="mt-4 h-fit w-full">
        <div className="w-full">
          <div className="relative h-80 w-full">
            <Image
              src={data.bannerImage || ''}
              width={500}
              height={300}
              alt={'Banner'}
              className="h-80 w-full rounded-xl border-[0.5px] border-gray-200 object-cover"
            />

            <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 translate-y-[40%] rounded-full border-[0.5px] border-gray-400 bg-white">
              <Image
                src={data.logoImage || ''}
                width={144}
                height={144}
                alt={'Banner'}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="mt-14 flex flex-col justify-center gap-2 text-center">
            <h2 className="text-2xl font-bold text-gray-700">{data.displayName}</h2>
            <div>{<CopyAddressButton textToCopy={slugPost} />}</div>
            <div className="flex items-center justify-center gap-5">
              <div className="text-center">
                <span className="text-base font-bold text-black">{itemsCount} </span>
                <span className="text-base text-gray-600">{t('titleItem')}</span>
              </div>

              <div className="text-center">
                <span className="text-base font-bold text-black">1 </span>
                <span className="text-base text-gray-600">{t('titleOwner')}</span>
              </div>
            </div>
            <p className="mt-4 text-base text-gray-600">{data.description}</p>
          </div>
        </div>

        <div className="mt-6 flex h-fit w-full items-center justify-center">
          <ContractData
            collectionContractAddress={slugPost}
            onItemsCountChange={handleItemsCountChange}
            slug={slugPost}
            displayName={data.displayName}
          />
        </div>
      </div>
    </>
  );
}

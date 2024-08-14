'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { HiTemplate } from 'react-icons/hi';

import Loading from '@/components/common/loading/Loading';
import ContractData from '@/components/pages/admin/ContractData';
import CopyAddressButton from '@/components/pages/admin/CopyAddressButton';
import { CollectionData } from '@/types/function';
import fetchDataCollectionById from '@/utils/fetchDataCollectionById';

export default function CollectionDetail({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<CollectionData | null>(null);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const slugPost = params.slug;

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
    <div className="h-fit w-full rounded-lg bg-white p-6">
      <div className="w-full">
        <div className="relative h-80 w-full">
          <Image
            src={data.bannerImage}
            width={500}
            height={300}
            alt={'Banner'}
            className="h-80 w-full rounded-xl object-cover "
          />

          <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 translate-y-[40%] rounded-full border-[0.5px] border-gray-400 bg-white">
            <Image
              src={data.logoImage}
              width={144}
              height={144}
              alt={'Banner'}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-center gap-3 text-center">
          <h2 className="text-2xl font-bold text-gray-700">{data.displayName}</h2>
          <div>{<CopyAddressButton textToCopy={data.address} />}</div>
          <p className="text-base font-semibold text-gray-400">{data.description}</p>
        </div>
      </div>

      <div className="my-6 w-full border-[1px] border-gray-200 px-6"></div>

      <div className="flex items-center justify-center gap-16">
        <div className="flex flex-col text-center">
          <span className="text-xl font-bold text-gray-600">Items</span>
          <span className="text-xl font-bold text-blue-500">{itemsCount}</span>
        </div>

        <div className="flex flex-col text-center">
          <span className="text-xl font-bold text-gray-600">Owner</span>
          <span className="text-xl font-bold text-blue-500">1</span>
        </div>
      </div>

      <div className="mt-4 flex h-fit w-full items-center justify-center">
        <ContractData
          collectionContractAddress={slugPost}
          onItemsCountChange={handleItemsCountChange}
        />
      </div>
    </div>
  );
}

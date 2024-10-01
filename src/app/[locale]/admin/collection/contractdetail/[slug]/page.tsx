'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { PiCertificateFill } from 'react-icons/pi';
import { RiShareBoxLine } from 'react-icons/ri';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import CopyButton from '@/components/common/coppyText/CopyButton';
import Loading from '@/components/common/loading/Loading';
import ContractData from '@/components/pages/admin/ContractData';
import { CollectionData } from '@/types/function';
import fetchDataCollectionById from '@/utils/fetchDataCollectionById';
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';
import { useTranslations } from 'next-intl';

export default function Page({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<CollectionData | null>(null);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const slugPost = params.slug;

  const t = useTranslations('Dapp.contractDetail');

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
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link href={'/admin/collection'}>
            <ButtonPrimary className="rounded-lg">
              <FaArrowLeft className="text-xl text-white" />
            </ButtonPrimary>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-600">{t('buttonBack')}</h1>
        </div>

        <div className="h-fit w-full overflow-hidden rounded-2xl border-[0.5px] border-gray-200 bg-white">
          <div className="h-fit w-full">
            <div className="relative h-56">
              <Image
                src={data.bannerImage || ''}
                alt="Xem trước hình ảnh banner"
                width={600}
                height={200}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 h-28 w-28 rounded-full border-[0.5px] border-gray-200">
                <Image
                  src={data.logoImage || ''}
                  alt="Xem trước logo"
                  width={112}
                  height={112}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-6">
          <div className="flex w-full flex-col gap-4">
            <div className="h-fit w-full rounded-lg bg-white px-8 py-4">
              <div className="flex items-center gap-2">
                <div className="flex w-1/2 items-center gap-2">
                  <PiCertificateFill className="text-5xl text-red-500" />
                  <div className="flex flex-col">
                    <div className="text-base text-gray-400">{t('titleCertificate')}</div>
                    <div className="text-lg font-bold text-gray-500">{itemsCount}</div>
                  </div>
                </div>

                <div className="flex w-1/2 items-center gap-2">
                  <FaUser className="text-5xl text-primary-50" />
                  <div className="flex flex-col">
                    <div className="text-base text-gray-400">{t('titleOwner')}</div>
                    <div className="text-lg font-bold text-gray-500">1</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full space-y-4 rounded-lg bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex w-1/2 flex-col gap-1">
                  <h2 className="text-lg font-bold text-gray-700">{t('displayName')}</h2>
                  <p className="text-sm font-semibold text-gray-500">{data.contractName}</p>
                </div>
                <div className="flex w-1/2 flex-col gap-1">
                  <h2 className="text-lg font-bold text-gray-700">{t('type')}</h2>
                  <p className="text-sm font-semibold text-gray-500">ERC-721</p>
                </div>
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex w-1/2 flex-col gap-1">
                  <h2 className="text-lg font-bold text-gray-700">{t('describe')}</h2>
                  <p className="text-sm font-semibold text-gray-500">{data.description}</p>
                </div>
                <div className="flex w-1/2 flex-col gap-1">
                  <h2 className="text-lg font-bold text-gray-700">{t('status')}</h2>
                  <p className="h-fit w-fit rounded-lg bg-green-200 px-4 py-2 text-sm font-semibold text-green-600">
                    Đã xác minh
                  </p>
                </div>
              </div> */}

              <div className="flex items-center justify-between">
                <div className="flex w-1/2 flex-col gap-1">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold text-gray-700">{t('contractAddress')}</h2>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-500">{data.contractAddress}</p>
                      <CopyButton textToCopy={data.contractAddress || ''} />
                      <Link
                        href={`https://polygonscan.com/address/${data.contractAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <RiShareBoxLine className="text-xl text-black" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex w-1/2 flex-col gap-1">
                  <h2 className="text-lg font-bold text-gray-700">{t('status')}</h2>
                  <p className="h-fit w-fit rounded-lg bg-green-200 px-4 py-2 text-sm font-semibold text-green-600">
                    Đã xác minh
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex w-1/2 flex-col gap-1">
                  <h2 className="text-lg font-bold text-gray-700">{t('symbol')}</h2>
                  <p className="text-sm font-semibold text-gray-500">{data.contractSymbol}</p>
                </div>
                <div className="flex w-1/2 flex-col gap-1">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold text-gray-700">{t('collectionOwner')}</h2>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-500">{data.address}</p>
                      <CopyButton textToCopy={data.address || ''} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex w-1/2 flex-col gap-1">
                  <h2 className="text-lg font-bold text-gray-700">{t('describe')}</h2>
                  <p className="text-sm font-semibold text-gray-500">{data.description}</p>
                </div>
                {/* <div className="flex w-1/2 flex-col gap-1">
                  <h2 className="text-lg font-bold text-gray-700">{t('status')}</h2>
                  <p className="h-fit w-fit rounded-lg bg-green-200 px-4 py-2 text-sm font-semibold text-green-600">
                    Đã xác minh
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden">
        <ContractData
          collectionContractAddress={slugPost}
          onItemsCountChange={handleItemsCountChange}
        />
      </div>
    </>
  );
}

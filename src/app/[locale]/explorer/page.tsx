/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';

import Link from 'next/link';
import { BiSolidCommentError } from 'react-icons/bi';
import { HiTemplate } from 'react-icons/hi';
import { useTranslations } from 'next-intl';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import Loading from '@/components/common/loading/Loading';
import CertificatePreview from '@/components/pages/admin/CertificatePreview';
import { CollectionData } from '@/types/function';
import fetchDataFirebase from '@/utils/featDataFirebase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LightBlueGradientEllipse from '../../../../public/Ellipse_1.svg';

export default function Explorer() {
  const [idCertificate, setIdCertificate] = useState<string>('');
  const [nameCertificate, setNameCertificate] = useState<string>('');
  const [data, setData] = useState<CollectionData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const t = useTranslations('ExplorerPage');
  const handleSearch = async () => {
    setLoading(true);
    setNotFound(false);
    setData(null);

    if (idCertificate || nameCertificate) {
      const result = await fetchDataFirebase('mintData', idCertificate, nameCertificate);
      setData(result);
      if (!result || result.mintData.length === 0) {
        setNotFound(true);
      }
    } else {
      setNotFound(true);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="relative flex-col items-center pt-16">
        <div className="fixed top-0 z-30 w-screen md:mt-6">
          <Navbar />
        </div>
        <div className="relative z-20 mt-10 px-6 md:px-14 lg:mt-28 lg:grid-cols-2 2xl:px-60">
          <div className="relative flex h-72 w-full flex-col items-center justify-center gap-3 rounded-[2.5rem]">
            <div className="font-bold text-gray-700 md:text-5xl ">{t('header')}</div>
            <div className="block w-full px-6 md:hidden">
              <div className="flex flex-col items-center justify-center gap-2 overflow-hidden px-2">
                <input
                  type="text"
                  placeholder={t('input_1.placeholder')}
                  value={idCertificate}
                  onChange={(e) => setIdCertificate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-black outline-none sm:py-6"
                />
                <input
                  type="text"
                  placeholder={t('input_2.placeholder')}
                  value={nameCertificate}
                  onChange={(e) => setNameCertificate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-black outline-none sm:py-6"
                />
                <ButtonPrimary onClick={handleSearch} className="px-3 py-5">
                  {t('search_button.label')}
                </ButtonPrimary>
              </div>
            </div>
            <div className="absolute -bottom-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-[150%] items-center justify-center gap-2 overflow-hidden rounded-full border-[0.5px] bg-white px-2 md:block">
              <div className="flex flex-col items-center justify-center gap-2 divide-y md:flex-row md:divide-x md:divide-y-0">
                <input
                  type="text"
                  placeholder="Your certificate code"
                  value={idCertificate}
                  onChange={(e) => setIdCertificate(e.target.value)}
                  className="w-80 px-4 py-4 text-black outline-none"
                />
                <input
                  type="text"
                  placeholder="Your full name"
                  value={nameCertificate}
                  onChange={(e) => setNameCertificate(e.target.value)}
                  className="w-72 px-4 py-4 text-black outline-none"
                />
                <ButtonPrimary onClick={handleSearch} className="px-3 py-5">
                  {t('search_button.label')}
                </ButtonPrimary>
              </div>
            </div>
          </div>

          {/* Show data */}
          {loading ? (
            <div className="flex h-screen w-full items-center justify-center">
              <Loading />
            </div>
          ) : notFound ? (
            <div className="flex h-screen w-full items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <BiSolidCommentError className="text-7xl text-gray-700" />
                <div className="text-lg font-semibold text-gray-700">Not found.</div>
              </div>
            </div>
          ) : data ? (
            <div className="mx-auto mt-10 w-[70%] space-y-4 text-black md:mt-32 md:w-1/2 ">
              <Link href={`/certificatedetail/${data.mintData[0][3]}`}>
                <CertificatePreview
                  previewImage={data.mintData[0][4][1]}
                  name={data.mintData[0][1]}
                  fontFamily={data.mintData[0].fontFamily}
                />
              </Link>
            </div>
          ) : (
            <div className="flex h-screen w-full items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <HiTemplate className="text-7xl text-gray-700" />
                <div className="text-lg font-semibold text-gray-700">
                  The certificate will be displayed here.
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="font-inter relative mt-10 w-full text-black">
          <Footer />
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col items-center overflow-hidden">
          <div className="relative mx-auto h-full w-full max-w-[90rem]">
            <div className="absolute -left-1/2 -top-1/2 -z-10 w-[125rem] sm:-translate-x-[20%] sm:-translate-y-[50%] sm:-top-[5%] sm:left-[-40%] sm:w-[150%]">
              <LightBlueGradientEllipse className="h-full w-full" />
            </div>
            <div className="absolute -right-1/2 -bottom-1/2 -z-10 w-[125rem] sm:-translate-y-[20%] sm:translate-x-[20%]">
              <LightBlueGradientEllipse className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

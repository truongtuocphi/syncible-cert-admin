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
// import LightBlueGradientEllipse from '../../../../public/Ellipse_1.svg';
import SearchIcon from '../../../../../public/outline-magifier.svg';
// import { montserrat } from '@/components/ui/fonts';

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

  const handleSearchforIdCert = async () => {
    setLoading(true);
    setNotFound(false);
    setData(null);

    if (idCertificate) {
      const result = await fetchDataFirebase('mintData', idCertificate, '');
      setData(result);
      if (!result || result.mintData.length === 0) {
        setNotFound(true);
      }
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  const handleSearchforName = async () => {
    setLoading(true);
    setNotFound(false);
    setData(null);

    if (nameCertificate) {
      const result = await fetchDataFirebase('mintData', '', nameCertificate);
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
      {/* <div className={`${montserrat.className} relative flex min-h-dvh flex-col`}>
        <Navbar /> */}
        <div className="z-20 flex min-h-dvh flex-col">
          <div className="flex flex-col flex-grow gap-4 px-4 h-full pt-24 sm:px-0 md:pt-[8.25rem] lg:pt-40 xl:pt-44">
            <div className="relative flex w-full flex-col items-center gap-2 rounded-[2.5rem] sm:gap-8">
              <div className="text-left text-[2.5rem] font-bold text-[#2C2C2C] sm:text-center md:text-5xl">
                {t('header')}
              </div>
              <div className="block w-full md:hidden">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center rounded-[2rem] border border-[#A2A3A9] bg-white p-3 pl-5">
                    <div className="flex items-center gap-3">
                      <SearchIcon className="h-6 w-6" />
                      <input
                        type="text"
                        placeholder={t('input_1.placeholder')}
                        value={idCertificate}
                        onChange={(e) => setIdCertificate(e.target.value)}
                        className="max-w-48 py-2 text-black outline-none sm:max-w-none"
                      />
                    </div>
                    <ButtonPrimary onClick={handleSearchforIdCert} className="px-5 py-3 font-bold shadow-combinedShadow1">
                      {t('search_button.label')}
                    </ButtonPrimary>
                  </div>
                  <div className="flex items-center rounded-[2rem] border border-[#A2A3A9] bg-white p-3 pl-5">
                    <div className="flex items-center gap-3">
                      <SearchIcon className="h-6 w-6" />
                      <input
                        type="text"
                        placeholder={t('input_2.placeholder')}
                        value={nameCertificate}
                        onChange={(e) => setNameCertificate(e.target.value)}
                        className="max-w-48 py-2 text-black outline-none sm:max-w-none"
                      />
                    </div>
                    <ButtonPrimary onClick={handleSearchforName} className="px-5 py-3 font-bold shadow-combinedShadow1">
                      {t('search_button.label')}
                    </ButtonPrimary>
                  </div>
                </div>
              </div>
              <div className="hidden gap-2 overflow-hidden rounded-[2rem] border border-[#A2A3A9] bg-white p-3 pl-5 md:block">
                <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
                  <SearchIcon className="h-6 w-6" />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Your certificate code"
                      value={idCertificate}
                      onChange={(e) => setIdCertificate(e.target.value)}
                      className="w-full border-r border-[#CCCCCC] pr-5 text-black outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={nameCertificate}
                      onChange={(e) => setNameCertificate(e.target.value)}
                      className="w-full text-black outline-none"
                    />
                  </div>
                  <ButtonPrimary
                    onClick={handleSearch}
                    className="rounded-[1.25rem] px-5 py-3 font-bold"
                  >
                    {t('search_button.label')}
                  </ButtonPrimary>
                </div>
              </div>
            </div>

            {/* Show data */}
            {loading ? (
              <div className="flex w-full items-center justify-center">
                <Loading />
              </div>
            ) : notFound ? (
              <div className="flex w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <BiSolidCommentError className="text-7xl text-gray-700" />
                  <div className="text-lg font-semibold text-gray-700">{t('result.not_found.label')}</div>
                </div>
              </div>
            ) : data ? (
              <div className="flex h-full w-full flex-grow items-center justify-center space-y-4 text-black md:mt-32">
                <Link
                  href={`/certificatedetail/${data.mintData[0][3]}`}
                  className="w-[90%] md:w-1/2"
                >
                  <CertificatePreview
                    previewImage={data.mintData[0][4][1]}
                    name={data.mintData[0][1]}
                    fontFamily={data.mintData[0].fontFamily}
                  />
                </Link>
              </div>
            ) : (
              <div className="flex flex-grow h-full w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <HiTemplate className="text-7xl text-gray-700" />
                  <div className="text-lg font-semibold text-gray-700">
                    {t('result.initial.label')}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <div className="relative mt-10 w-full text-black">
          <Footer />
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col items-center overflow-hidden">
          <div className="relative mx-auto h-full w-full max-w-[90rem]">
            <div className="absolute -left-1/2 -top-1/2 -z-10 w-[125rem] sm:-top-[5%] sm:left-[-40%] sm:w-[150%] sm:-translate-x-[20%] sm:-translate-y-[50%]">
              <LightBlueGradientEllipse className="h-full w-full" />
            </div>
            <div className="absolute -bottom-1/2 -right-1/2 -z-10 w-[125rem] sm:-translate-y-[20%] sm:translate-x-[20%]">
              <LightBlueGradientEllipse className="h-full w-full" />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

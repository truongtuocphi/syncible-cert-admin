/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BiSolidCommentError } from 'react-icons/bi';
import { HiTemplate } from 'react-icons/hi';
import { useTranslations } from 'next-intl';
import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import Loading from '@/components/common/loading/Loading';
import CertificatePreview from '@/components/pages/admin/CertificatePreview';
import { CollectionData } from '@/types/function';
import fetchDataFirebase from '@/utils/featDataFirebase';
import SearchIcon from '../../../../../public/outline-magifier.svg';

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
      console.log('result', result);
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

  const handleEnterKey = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // useEffect(() => {
  //   const handleKeyDown = (e: {
  //     key: string;
  //     preventDefault: () => void;
  //     ctrlKey: boolean;
  //     metaKey: boolean;
  //     shiftKey: boolean;
  //   }) => {
  //     if (e.key === 'F12') {
  //       e.preventDefault();
  //     }

  //     if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
  //       e.preventDefault();
  //     }
  //   };

  //   const handleContextMenu = (e: { preventDefault: () => void }) => {
  //     e.preventDefault();
  //   };

  //   const detectDevTools = () => {
  //     const threshold = 160;
  //     if (
  //       window.outerHeight - window.innerHeight > threshold ||
  //       window.outerWidth - window.innerWidth > threshold
  //     ) {
  //       alert('DevTools detected! Please close DevTools to continue browsing.');
  //       window.location.href = 'about:blank';
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyDown);
  //   document.addEventListener('contextmenu', handleContextMenu);

  //   const interval = setInterval(detectDevTools, 1000);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <>
      <div className="flex h-full grow flex-col gap-4 px-4 pt-24 sm:px-0 md:pt-[8.25rem] lg:pt-40 xl:pt-44">
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
                <ButtonPrimary
                  onClick={handleSearchforIdCert}
                  className="px-5 py-3 font-bold shadow-combinedShadow1"
                >
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
                <ButtonPrimary
                  onClick={handleSearchforName}
                  className="px-5 py-3 font-bold shadow-combinedShadow1"
                >
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
                  onKeyDown={handleEnterKey}
                />
                <input
                  type="text"
                  placeholder="Your full name"
                  value={nameCertificate}
                  onChange={(e) => setNameCertificate(e.target.value)}
                  className="w-full text-black outline-none"
                  onKeyDown={handleEnterKey}
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
              <div className="text-lg font-semibold text-gray-700">
                {t('result.not_found.label')}
              </div>
            </div>
          </div>
        ) : data && data.mintData.length > 0 ? (
          data.mintData.length >= 2 ? (
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 2xl:max-w-[1600px]">
              {data.mintData.map((item: any, index: any) => (
                <Link
                  key={index}
                  href={`/certificatedetail/${item[3]}`}
                  className="flex justify-center"
                >
                  <CertificatePreview
                    previewImage={item[4][1]}
                    name={item[1]}
                    fontFamily={item.fontFamily}
                    IdentifierPinata={item[3]}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-3 space-y-4 text-black md:mt-32">
              <Link href={`/certificatedetail/${data.mintData[0][3]}`} className="w-[90%] md:w-1/2">
                <CertificatePreview
                  previewImage={data.mintData[0][4][1]}
                  name={data.mintData[0][1]}
                  fontFamily={data.mintData[0].fontFamily}
                  IdentifierPinata={data.mintData[0][3]}
                />
              </Link>
            </div>
          )
        ) : (
          <div className="flex h-full w-full flex-grow items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <HiTemplate className="text-7xl text-gray-700" />
              <div className="text-lg font-semibold text-gray-700">{t('result.initial.label')}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

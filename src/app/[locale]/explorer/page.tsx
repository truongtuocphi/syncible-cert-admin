/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';

import Link from 'next/link';
import { BiSolidCommentError } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import { HiTemplate } from 'react-icons/hi';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import Loading from '@/components/common/loading/Loading';
import CertificatePreview from '@/components/pages/admin/CertificatePreview';
import { CollectionData } from '@/types/function';
import fetchDataFirebase from '@/utils/featDataFirebase';

export default function Explorer() {
  const [idCertificate, setIdCertificate] = useState<string>('');
  const [nameCertificate, setNameCertificate] = useState<string>('');
  const [data, setData] = useState<CollectionData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);

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
      <div className="min-h-screen flex-col items-center pt-16">
        <div className="mt-10 px-6 md:px-14 lg:mt-28 lg:grid-cols-2 2xl:px-60">
          <div className="relative flex h-72 w-full items-center justify-center rounded-[2.5rem] border-t-2 border-white bg-gradient-to-b from-white/50 shadow-lg">
            <div className="text-5xl font-bold text-gray-700">Find your certificate.</div>
            <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2 overflow-hidden rounded-full border-[0.5px] bg-white px-2">
              <input
                type="text"
                placeholder="Your certificate code"
                value={idCertificate}
                onChange={(e) => setIdCertificate(e.target.value)}
                className="w-80 border-r-[0.5px] border-gray-300 px-4 py-6 text-black outline-none"
              />
              <input
                type="text"
                placeholder="Your full name"
                value={nameCertificate}
                onChange={(e) => setNameCertificate(e.target.value)}
                className="w-72 px-4 py-6 text-black outline-none"
              />
              <ButtonPrimary onClick={handleSearch} className="size-14 p-1">
                <FaSearch className="text-xl text-white" />
              </ButtonPrimary>
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
            <div className="mx-auto mt-16 h-[170px] w-1/2 space-y-4 rounded-xl bg-white p-4 text-black sm:h-[270px] lg:h-[450px] 2xl:h-[500px]">
              <Link href={`/certificatedetail/${data.mintData[0].tokenURI}`}>
                <CertificatePreview
                  previewImage={data.mintData[0].certData.templateURL}
                  name={data.mintData[0].fullname}
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
      </div>
    </>
  );
}

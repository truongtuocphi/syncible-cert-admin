/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';

import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { HiTemplate } from 'react-icons/hi';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import CertificatePreview from '@/components/pages/admin/CertificatePreview';
import { CollectionData } from '@/types/function';
import configDate from '@/utils/configDate';
import fetchDataFirebase from '@/utils/featDataFirebase';
import Loading from '@/components/common/loading/Loading';
import { BiSolidCommentError } from 'react-icons/bi';

const headerURL = process.env.NEXT_PUBLIC_HEADER_URL;

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
      <div className="fixed z-10 w-full bg-purple-500/30 shadow backdrop-blur-sm">
        <Navbar />
      </div>
      <div className="min-h-screen flex-col items-center pt-16">
        <div className="mt-10 px-6 md:px-14 lg:mt-28 lg:grid-cols-2 2xl:px-60">
          <div className="relative flex h-72 w-full items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 shadow-lg">
            <div className="text-5xl font-bold">Find your certificate.</div>
            <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-2">
              <input
                type="text"
                placeholder="Your Certificate ID"
                value={idCertificate}
                onChange={(e) => setIdCertificate(e.target.value)}
                className="w-80 border-r-[0.5px] border-gray-300 px-4 py-6 text-black outline-none"
              />
              <input
                type="text"
                placeholder="Your Certificate Name"
                value={nameCertificate}
                onChange={(e) => setNameCertificate(e.target.value)}
                className="w-72 px-4 py-6 text-black outline-none"
              />
              <ButtonPrimary onClick={handleSearch} className="size-14 p-1">
                <FaSearch className="text-xl" />
              </ButtonPrimary>
            </div>
          </div>

          {/* Hiển thị dữ liệu */}
          {loading ? (
            <div className="flex h-screen w-full items-center justify-center">
              <Loading />
            </div>
          ) : notFound ? (
            <div className="flex h-screen w-full items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <BiSolidCommentError className="text-7xl text-white" />
                <div className="text-lg font-semibold text-white">No Data Found</div>
              </div>
            </div>
          ) : data ? (
            <div className="mx-auto mt-16 w-1/2 space-y-4 rounded-xl bg-white p-4 text-black">
              <Link href={`/certificatedetail/${data.mintData[0].tokenURI}`}>
                <CertificatePreview
                  headerURL={headerURL}
                  description={data.mintData[0].certData.description}
                  previewImage={`${headerURL}/ipfs/${data.mintData[0].certData.templateURL}`}
                  previewHeadLogo={`${headerURL}/ipfs/${data.mintData[0].certData.organizationLogo}`}
                  certificateNumber={data.mintData[0].certificateId}
                  authorizingOrgName={data.mintData[0].certData.organizationName}
                  headOrgPosition={data.mintData[0].certData.headPosition}
                  headOrgName={data.mintData[0].certData.headName}
                  previewSignature={`${headerURL}/ipfs/${data.mintData[0].certData.organizationLogo}`}
                  name={data.mintData[0].fullName.split('Certificate for')}
                  date={configDate(data.mintData[0].certData.date)}
                />
              </Link>
            </div>
          ) : (
            <div className="flex h-screen w-full items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <HiTemplate className="text-7xl text-white" />
                <div className="text-lg font-semibold text-white">No Item</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="relative text-white">
        <Footer />
      </div>
    </>
  );
}

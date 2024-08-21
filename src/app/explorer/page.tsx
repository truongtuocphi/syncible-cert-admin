/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';

import Link from 'next/link';
import { HiTemplate } from 'react-icons/hi';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { CollectionData } from '@/types/function';
import configDate from '@/utils/configDate';
import fetchDataFirebase from '@/utils/featDataFirebase';
import CertificatePreview from '@/components/pages/admin/CertificatePreview';

const headerURL = process.env.NEXT_PUBLIC_HEADER_URL;

export default function Explorer() {
  const [idCertificate, setIdCertificate] = useState<string>('');
  const [nameCertificate, setNameCertificate] = useState<string>('');
  const [data, setData] = useState<CollectionData | null>(null);

  const handleSearch = async () => {
    if (idCertificate || nameCertificate) {
      const result = await fetchDataFirebase('mintData', idCertificate, nameCertificate);
      setData(result);
    }
  };

  return (
    <>
      <div className="fixed z-10 w-full bg-purple-500/30 shadow backdrop-blur-sm">
        <Navbar />
      </div>
      <div className="min-h-screen flex-col items-center pt-16">
        <div className="mt-10 px-6 md:px-14 lg:mt-28 lg:grid-cols-2 lg:px-24 2xl:px-60">
          <div className="flex justify-center gap-2">
            <input
              type="text"
              placeholder="Your Certificate ID"
              value={idCertificate}
              onChange={(e) => setIdCertificate(e.target.value)}
              className="rounded-lg px-4 py-2 text-black"
            />
            <input
              type="text"
              placeholder="Your Certificate Name"
              value={nameCertificate}
              onChange={(e) => setNameCertificate(e.target.value)}
              className="rounded-lg px-4 py-2 text-black"
            />
            <ButtonPrimary onClick={handleSearch}>Search</ButtonPrimary>
          </div>

          {/* Hiển thị dữ liệu */}
          {data ? (
            <div className="mx-auto mt-5 w-1/2 space-y-4 rounded-xl bg-white p-4 text-black">
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

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
            <div className="mx-auto mt-5 w-2/3 space-y-4 rounded-xl bg-white p-4 text-black">
              <Link href={`/certificatedetail/${data.mintData[0].tokenURI}`}>
                <div className="relative w-full overflow-hidden">
                  <img
                    src={`${headerURL}/ipfs/${data.mintData[0].certData.templateURL}`}
                    alt="Certificate Template"
                    className="w-full rounded-lg"
                  />
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ fontFamily: 'Times New Roman, serif' }}
                  >
                    <div className="absolute top-[15%] text-center">
                      <h1 className="text-[1.5vw] font-bold md:text-[3vw]">CHỨNG NHẬN</h1>
                      <p className="text-[1.5vw] md:text-[1.5vw] lg:text-[1.2vw]">{`Số: ${data.mintData[0].certificateId}`}</p>
                      <h1 className="text-[2vw] font-bold md:text-[2.5vw] 2xl:text-[4vw]">
                        {data.mintData[0].fullName.split('Certificate for')}
                      </h1>
                      <p className="mt-2 text-center text-[1.2vw] md:text-[1.5vw] lg:text-[1.5vw]">
                        Đã hoàn thành khóa đào tạo ngắn hạn
                        <br />
                        “ỨNG DỤNG AI TRONG QUẢN LÝ HÀNH CHÍNH”
                      </p>
                      <span className="mt-2 text-[2.5vw] md:text-[1.5vw] lg:text-[1.2vw]">
                        {configDate(data.mintData[0].certData.date)}
                      </span>
                    </div>
                    <div className="absolute bottom-[10%] left-[7%] flex flex-col items-center">
                      <img
                        src={`${headerURL}/ipfs/${data.mintData[0].certData.headSignature}`}
                        alt="Head Signature"
                        className="w-[4vw] md:w-[5vw] lg:w-[7vw]"
                      />
                      <div className="text-center">
                        <p className="text-[1vw] md:text-[1vw] lg:text-[0.8vw]">{`${data.mintData[0].certData.headName}`}</p>
                        <p className="text-[1vw] md:text-[1vw] lg:text-[0.8vw]">{`${data.mintData[0].certData.headPosition} tổ chức ${data.mintData[0].certData.organizationName}`}</p>
                        <p className="text-[1vw] md:text-[1vw] lg:text-[0.8vw]">{`Giấy chứng nhận số: ${data.mintData[0].certificateId}`}</p>
                        <p className="text-[1vw] md:text-[1vw] lg:text-[0.8vw]">{`của ${data.mintData[0].certData.organizationName}, cấp ngày ${data.mintData[0].certData.date}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
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

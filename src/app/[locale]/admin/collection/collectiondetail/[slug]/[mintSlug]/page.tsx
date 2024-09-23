'use client';

import { useState } from 'react';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import IdExperienceComponent from '@/components/pages/IdExperienceComponent';
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';

const IdExperience = ({ params }: { params: { mintSlug: string } }) => {
  const [dataContract, setDataContract] = useState(null);
  const [nameCertificate, setNameCertificate] = useState('');
  const slugPost = params.mintSlug;

  const handleDataContract = (data: any) => {
    setDataContract(data);
  };

  const handleDataNameCertificate = (dataName: any) => {
    setNameCertificate(dataName);
  };

  return (
    <>
      <div className="mb-4">
        <Breadcrumb nameCertificate={nameCertificate} />
      </div>
      <div className="flex items-center gap-2">
        <Link href={`/admin/collection/collectiondetail/${dataContract}`}>
          <ButtonPrimary className="rounded-lg bg-blue-500">
            <FaArrowLeft className="text-xl text-white" />
          </ButtonPrimary>
        </Link>
        <h2 className="text-2xl font-bold text-gray-600">Chi tiết chứng chỉ</h2>
      </div>
      <IdExperienceComponent
        slugPost={slugPost}
        onDataContract={handleDataContract}
        onDataNameCertificate={handleDataNameCertificate}
      />
    </>
  );
};

export default IdExperience;

'use client';

import { useState } from 'react';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import IdExperienceComponent from '@/components/pages/IdExperienceComponent';

const IdExperience = ({ params }: { params: { slug: string } }) => {
  const [dataContract, setDataContract] = useState(null);
  const slugPost = params.slug;

  const handleDataContract = (data: any) => {
    setDataContract(data);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Link href={`/admin/collection/collectiondetail/${dataContract}`}>
          <ButtonPrimary className="rounded-lg bg-blue-500">
            <FaArrowLeft className="text-xl text-white" />
          </ButtonPrimary>
        </Link>
        <h2 className="text-2xl font-bold text-gray-600">Chi tiết chứng chỉ</h2>
      </div>
      <IdExperienceComponent slugPost={slugPost} onDataContract={handleDataContract} />
    </>
  );
};

export default IdExperience;

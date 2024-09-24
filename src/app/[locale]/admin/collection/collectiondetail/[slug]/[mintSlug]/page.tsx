'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import IdExperienceComponent from '@/components/pages/IdExperienceComponent';
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';
import { useSearchParams } from 'next/navigation'; // Import hook from Next.js

const IdExperience = ({ params }: { params: { mintSlug: string } }) => {
  const [dataContract, setDataContract] = useState(null);
  const [nameCertificate, setNameCertificate] = useState('');
  const [displayName, setDisplayName] = useState('');
  const slugPost = params.mintSlug;

  const searchParams = useSearchParams();
  const someQueryParam = searchParams.get('nameCollection');

  const handleDataContract = (data: any) => {
    setDataContract(data);
  };

  const handleDataNameCertificate = (dataName: any) => {
    setNameCertificate(dataName);
  };

  useEffect(() => {
    if (someQueryParam) {
      setDisplayName(someQueryParam);
    }
  }, [someQueryParam]);

  return (
    <>
      <div className="mb-4">
        <Breadcrumb
          nameCertificate={nameCertificate?.split('Certificate for')[1]?.trim() || 'Loading...'}
          displayName={displayName}
        />
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

'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import IdExperienceComponent from '@/components/pages/IdExperienceComponent';

const IdExperience = ({ params }: { params: { slug: string } }) => {
  const slugPost = params.slug;

  return (
    <>
      <div className="flex items-center gap-2">
        <Link href={'/admin/collection'}>
          <ButtonPrimary className="rounded-lg bg-blue-500">
            <FaArrowLeft className="text-xl text-white" />
          </ButtonPrimary>
        </Link>
        <h2 className="text-2xl font-bold text-gray-600">Verify</h2>
      </div>
      <IdExperienceComponent slugPost={slugPost} />
    </>
  );
};

export default IdExperience;

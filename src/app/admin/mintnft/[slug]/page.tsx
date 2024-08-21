'use client';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import IdExperienceComponent from '@/components/pages/IdExperienceComponent';
import { FaArrowLeft } from 'react-icons/fa';

const IdExperience = ({ params }: { params: { slug: string } }) => {
  const slugPost = params.slug;

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <ButtonPrimary className="rounded-lg bg-blue-500" onClick={handleBack}>
          <FaArrowLeft className="text-xl text-white" />
        </ButtonPrimary>
        <h2 className="text-2xl font-bold text-gray-600">Verify</h2>
      </div>
      <IdExperienceComponent slugPost={slugPost} />;
    </>
  );
};

export default IdExperience;

'use client';

import { useSearchParams } from 'next/navigation';

import CreateNFT from '@/components/pages/experience/CreateNFT';

const Experience = () => {
  const pathname = useSearchParams();

  const typePage = pathname.get('type');

  return (
    <>
      <p>Value is: {typePage}</p>
      {/* <CreateNFT /> */}
    </>
  );
};

export default Experience;

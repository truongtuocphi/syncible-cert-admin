'use client';

import MintPage from '@/components/pages/mint';

const Page = () => {
  return (
    <div>
      <div className="flex justify-center pt-16">
        <div className="min-h-[calc(100vh-10rem)] w-full max-w-screen-lg px-4 py-12 md:px-8 xl:px-12">
          <MintPage />
        </div>
      </div>
    </div>
  );
};

export default Page;

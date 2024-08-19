'use client';

import { useState } from 'react';

import CreateNFT from '@/components/pages/experience/CreateNFT';

const Experience = () => {
  const [templateData, setTemplateData] = useState<any>(null);

  return (
    <>
      <CreateNFT templateData={templateData} />
    </>
  );
};

export default Experience;

'use client';

import { useState } from 'react';

import CreateNFT from '@/components/pages/experience/CreateNFT';
import DefineTemplate from '@/components/pages/experience/DefineTemplate';

const Experience = () => {
  const [step, setStep] = useState(0);
  const [templateData, setTemplateData] = useState<any>(null);

  const handleNextFromDefineTemplate = (data: any) => {
    setTemplateData(data);
    setStep(1);
  };

  return (
    <div className="w-full pt-16">
      <div className="min-h-[calc(100vh-10rem)] w-full px-6 py-12 md:px-14 lg:px-24 2xl:px-60">
        {step === 0 && <DefineTemplate onNext={handleNextFromDefineTemplate} />}
        {step === 1 && <CreateNFT templateData={templateData} />}
      </div>
    </div>
  );
};

export default Experience;

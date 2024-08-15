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
    <>
      {step === 0 && <DefineTemplate onNext={handleNextFromDefineTemplate} />}
      {step === 1 && <CreateNFT templateData={templateData} />}
    </>
  );
};

export default Experience;

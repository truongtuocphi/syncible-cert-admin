/* eslint-disable @next/next/no-img-element */
import React from 'react';

const CertificatePreview: React.FC<any> = ({ previewImage, name, fontFamily, fontSize }) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border-[0.5px]">
      <img src={previewImage} alt="Certificate_Image" className="h-full w-full rounded-lg" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="text-3xl font-bold"
          style={{ fontFamily: fontFamily, fontSize: `${fontSize}px` }}
        >
          {name}
        </h1>
      </div>
    </div>
  );
};

export default CertificatePreview;

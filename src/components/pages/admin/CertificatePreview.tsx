/* eslint-disable @next/next/no-img-element */
import React from 'react';

const CertificatePreview: React.FC<any> = ({
  previewImage,
  name,
  fontFamily = 'Dancing Script',
  fontSize = 40,
}) => {
  // Function to determine the font size based on screen width
  const getFontSize = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return `${fontSize * 0.8}px`; // Mobile
      if (width < 768) return `${fontSize}px`; // Tablet
      if (width < 1024) return `${fontSize * 1.2}px`; // Small Laptop
      if (width < 1280) return `${fontSize * 1.5}px`; // Large Laptop
      return `${fontSize * 2}px`; // Desktop
    }
    return `${fontSize}px`; // Fallback
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src={previewImage} alt="Certificate_Image" className="h-full w-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="text-3xl font-bold"
          style={{ fontFamily: fontFamily, fontSize: getFontSize() }}
        >
          {name}
        </h1>
      </div>
    </div>
  );
};

export default CertificatePreview;

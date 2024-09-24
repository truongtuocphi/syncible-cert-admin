/* eslint-disable @next/next/no-img-element */
import React from 'react';

const CertificatePreview: React.FC<any> = ({
  previewImage,
  name,
  fontFamily = 'Dancing Script',
  fontSize = 40, // Default font size
}) => {
  // Function to determine the font size based on screen width
  const getFontSize = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;

      // Calculate a fluid font size based on the viewport width
      // Base font size with some scaling for larger screens
      return `${Math.max(fontSize, Math.min(fontSize + width / 100, fontSize + 40))}px`;
    }
    return `${fontSize}px`; // Fallback
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src={previewImage} alt="Certificate_Image" className="h-full w-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="font-bold" style={{ fontFamily, fontSize: getFontSize() }}>
          {name}
        </h1>
      </div>
    </div>
  );
};

export default CertificatePreview;

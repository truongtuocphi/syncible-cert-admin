'use client';

import { useEffect, useState } from 'react';

const Certificate = ({
  previewImage,
  name,
  fontFamily = 'Dancing Script',
  fontSize = { base: 40, sm: 45, md: 50, lg: 55, xl: 60 },
  fontSizeMint = 40,
}: any) => {
  const [userFontSize, setUserFontSize] = useState(fontSize.base);

  useEffect(() => {
    const isMintNFTPage = window.location.pathname.includes('mintnft');

    const handleResize = () => {
      const image = document.getElementById('certificate-image');
      let newFontSize = fontSize.base;

      const screenWidth = window.innerWidth;

      // Áp dụng logic nếu là trang mintnft
      if (isMintNFTPage) {
        newFontSize = fontSizeMint; // Áp dụng fontSizeMint cho trang mintnft
      } else {
        // Áp dụng fontSize cho các trang khác
        if (screenWidth >= 3840) newFontSize = fontSize.xl + 25;
        else if (screenWidth >= 2560) newFontSize = fontSize.lg + 35;
        else if (screenWidth >= 1280) newFontSize = fontSize.lg - 15;
        else if (screenWidth >= 768) newFontSize = fontSize.md - 20;
        else if (screenWidth >= 640) newFontSize = fontSize.sm - 20;
        else if (screenWidth < 640 && screenWidth > 500) newFontSize = fontSize.sm - 20;
        else if (screenWidth <= 500) newFontSize = fontSize.base - 25;
      }

      // Điều chỉnh kích thước font theo kích thước hình ảnh (nếu có)
      if (image) {
        const imageWidth = image.clientWidth;
        let adjustedFontSize = Math.max(20, imageWidth / 15);

        adjustedFontSize *= 1.2;

        if (window.innerWidth >= 2560) {
          adjustedFontSize *= 0.9;
        }

        // Áp dụng fontSizeMint cho trang mintnft nếu có
        const fontsizeMintNFT = adjustedFontSize;
        setUserFontSize(isMintNFTPage ? fontsizeMintNFT : adjustedFontSize);
      } else {
        // Nếu không có hình ảnh, đặt giá trị fontSize mới
        setUserFontSize(newFontSize);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial font size on mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [fontSize, fontSizeMint]);

  const finalFontSize = `${userFontSize}px`;

  return (
    <div className="relative h-full w-full">
      {/* Image */}
      <img
        id="certificate-image"
        src={previewImage}
        alt="Certificate_Image"
        className="h-full w-full object-cover shadow-combinedShadow2"
      />
      {/* Name */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="font-bold"
          style={{
            fontFamily: fontFamily,
            fontSize: finalFontSize,
          }}
        >
          {name}
        </h1>
      </div>
    </div>
  );
};

export default Certificate;

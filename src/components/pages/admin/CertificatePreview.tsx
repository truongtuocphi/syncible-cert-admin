'use client';

import { useEffect, useState } from 'react';
// import { QRCode } from 'react-qrcode-logo';
import { usePathname } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';

const Certificate = ({
  previewImage,
  name,
  fontFamily = 'Dancing Script',
  fontSize = { base: 40, sm: 45, md: 50, lg: 55, xl: 60 },
  fontSizeMint = 40,
}: any) => {
  const [userFontSize, setUserFontSize] = useState(fontSize.base);
  const [rightPosition, setRightPosition] = useState(0);
  const [qrSize, setQRSize] = useState(0);

  useEffect(() => {
    const isMintNFTPage = window.location.pathname.includes('mintnft');

    const handleResize = () => {
      const image = document.getElementById('certificate-image');
      let newFontSize = fontSize.base;
      const screenWidth = window.innerWidth;

      if (isMintNFTPage) {
        newFontSize = fontSizeMint;
      } else {
        if (screenWidth >= 3840) newFontSize = fontSize.xl + 25;
        else if (screenWidth >= 2560) newFontSize = fontSize.lg + 35;
        else if (screenWidth >= 1280) newFontSize = fontSize.lg - 15;
        else if (screenWidth >= 768) newFontSize = fontSize.md - 20;
        else if (screenWidth >= 640) newFontSize = fontSize.sm - 20;
        else if (screenWidth < 640 && screenWidth > 500) newFontSize = fontSize.sm - 20;
        else if (screenWidth <= 500) newFontSize = fontSize.base - 25;
      }

      if (image) {
        const imageWidth = image.clientWidth;
        let adjustedFontSize = Math.max(20, imageWidth / 22);
        let adjustedQRCode = Math.max(25, imageWidth / 15);
        let rightPosition = Math.max(10, imageWidth / 20);

        // adjustedFontSize *= 1.2;

        if (window.innerWidth >= 2560) {
          adjustedFontSize *= 0.9;
        }

        const fontsizeMintNFT = adjustedFontSize;
        setUserFontSize(isMintNFTPage ? fontsizeMintNFT : adjustedFontSize);
        setQRSize(adjustedQRCode);
        setRightPosition(rightPosition);
      } else {
        setUserFontSize(newFontSize);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

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
      <div className="textName absolute inset-0 flex items-center justify-center">
        <h1
          // className="font-semibold"
          style={{
            fontFamily: fontFamily,
            fontSize: finalFontSize,
          }}
        >
          {name}
        </h1>
      </div>
      <div
        className={`absolute top-1/2 -translate-y-1/2 transform`}
        style={{ right: `${rightPosition}px` }}
      >
        <div className="flex flex-col items-center gap-1">
          {/* {pathname?.includes('/certificatedetail') && (
            <QRCodeSVG value={window.location.href} size={qrSize} fgColor="#02bd02" />
          )} */}
          <QRCodeSVG value={window.location.href} size={qrSize} fgColor="#02bd02" />
        </div>
      </div>
    </div>
  );
};

export default Certificate;

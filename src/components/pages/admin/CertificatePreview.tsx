import { useEffect, useState } from 'react';

const Certificate = ({
  previewImage,
  name,
  fontFamily = 'Dancing Script',
  fontSize = { base: 40, sm: 45, md: 50, lg: 55, xl: 60 },
}: any) => {
  const [userFontSize, setUserFontSize] = useState(fontSize.base);

  useEffect(() => {
    const isMintNFTPage = window.location.pathname.includes('mintnft');

    const handleResize = () => {
      const image = document.getElementById('certificate-image');
      let newFontSize = fontSize.base;

      // Responsive font size based on screen width
      const screenWidth = window.innerWidth;
      if (screenWidth >= 3840) newFontSize = fontSize.xl;
      else if (screenWidth >= 2560) newFontSize = fontSize.lg + 20;
      else if (screenWidth >= 1280) newFontSize = fontSize.lg - 15;
      else if (screenWidth >= 768) newFontSize = fontSize.md - 20;
      else if (screenWidth >= 640) newFontSize = fontSize.sm - 20;
      else if (screenWidth < 640 && screenWidth > 500) newFontSize = fontSize.sm - 20;
      else if (screenWidth <= 500) newFontSize = fontSize.base - 25;

      if (isMintNFTPage && image) {
        const imageWidth = image.clientWidth;
        let adjustedFontSize = Math.max(20, imageWidth / 10);

        if (window.innerWidth >= 2560) {
          adjustedFontSize *= 0.8;
        }
        setUserFontSize(adjustedFontSize);
      } else {
        setUserFontSize(newFontSize);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial font size on mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [fontSize]);

  const finalFontSize = `${userFontSize}px`;
  console.log('finalFontSize', finalFontSize);
  return (
    <div className="relative h-full w-full">
      {/* Image */}
      <img
        id="certificate-image"
        src={previewImage}
        alt="Certificate_Image"
        className="h-full w-full object-cover"
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

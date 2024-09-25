import { useEffect, useState } from 'react';

const Certificate = ({
  previewImage,
  name,
  fontFamily = 'Dancing Script',
  fontSize = { base: 40, sm: 45, md: 50, lg: 55, xl: 60 },
}: any) => {
  const [userFontSize, setUserFontSize] = useState(fontSize.base);

  useEffect(() => {
    if (!window.location.pathname.includes('mintnft')) {
      return;
    }

    const handleResize = () => {
      const image = document.getElementById('certificate-image');
      if (image) {
        const imageWidth = image.clientWidth;
        let newFontSize = Math.max(20, imageWidth / 10);

        if (window.innerWidth >= 2560) {
          newFontSize *= 0.8;
        }

        setUserFontSize(newFontSize);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to dynamically choose font size based on screen width
  const getResponsiveFontSize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 3840) return fontSize.xl;
    if (screenWidth >= 2560) return fontSize.lg + 20;
    if (screenWidth >= 1280) return fontSize.lg - 15;
    if (screenWidth >= 768) return fontSize.md - 20;
    if (screenWidth >= 640) return fontSize.sm;
    if (screenWidth < 640) return fontSize.sm - 20;
    if (screenWidth <= 500) return fontSize.sm - 20;
    return fontSize.base;
  };

  const finalFontSize = window.location.pathname.includes('mintnft')
    ? `${userFontSize}px`
    : `${getResponsiveFontSize()}px`;

  console.log('finalFontSize', finalFontSize);

  return (
    <div className="relative h-full w-full">
      {/* Hiển thị ảnh */}
      <img
        id="certificate-image"
        src={previewImage}
        alt="Certificate_Image"
        className="h-full w-full object-cover"
      />
      {/* Hiển thị tên */}
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

import { useEffect, useState } from 'react';

const Certificate = ({
  previewImage,
  name,
  fontFamily = 'Dancing Script',
  customFontSize = { base: 40, sm: 45, md: 50, lg: 55, xl: 60 },
  fontSizeMint = 40,
}: any) => {
  const [userFontSize, setUserFontSize] = useState(customFontSize.base);

  useEffect(() => {
    const isMintNFTPage = window.location.pathname.includes('mintnft');

    const handleResize = () => {
      const image = document.getElementById('certificate-image');
      let newFontSize = customFontSize.base;

      const screenWidth = window.innerWidth;

      // Áp dụng logic nếu là trang mintnft
      if (isMintNFTPage) {
        newFontSize = fontSizeMint; // Áp dụng fontSizeMint cho trang mintnft
      } else {
        // Áp dụng customFontSize cho các trang khác
        if (screenWidth >= 3840) newFontSize = customFontSize.xl;
        else if (screenWidth >= 2560) newFontSize = customFontSize.lg + 20;
        else if (screenWidth >= 1280) newFontSize = customFontSize.lg - 15;
        else if (screenWidth >= 768) newFontSize = customFontSize.md - 20;
        else if (screenWidth >= 640) newFontSize = customFontSize.sm - 20;
        else if (screenWidth < 640 && screenWidth > 500) newFontSize = customFontSize.sm - 20;
        else if (screenWidth <= 500) newFontSize = customFontSize.base - 25;
      }

      // Điều chỉnh kích thước font theo kích thước hình ảnh (nếu có)
      if (image) {
        const imageWidth = image.clientWidth;
        let adjustedFontSize = Math.max(20, imageWidth / 10);

        if (window.innerWidth >= 2560) {
          adjustedFontSize *= 0.8;
        }

        // Áp dụng fontSizeMint cho trang mintnft nếu có
        setUserFontSize(isMintNFTPage ? fontSizeMint : adjustedFontSize);
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
  }, [customFontSize, fontSizeMint]);

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

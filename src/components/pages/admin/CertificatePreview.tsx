import { useEffect, useState } from 'react';

const Certificate = ({ previewImage, name, fontFamily = 'Dancing Script', fontSize = 40 }: any) => {
  const [userFontSize, setUserFontSize] = useState(fontSize);

  useEffect(() => {
    if (!window.location.pathname.includes('mintnft')) {
      return;
    }

    const handleResize = () => {
      const image = document.getElementById('certificate-image');
      if (image) {
        const imageWidth = image.clientWidth;
        let newFontSize = Math.max(20, imageWidth / 10);

        if (window.innerWidth >= 1340) {
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

  const finalFontSize = window.location.pathname.includes('mintnft')
    ? `${fontSize}px`
    : `${userFontSize}px`;

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

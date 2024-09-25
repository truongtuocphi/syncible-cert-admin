import { useEffect, useState } from 'react';

const Certificate = ({ previewImage, name, fontFamily = 'Dancing Script', fontSize = 40 }: any) => {
  const [dynamicFontSize, setDynamicFontSize] = useState(fontSize);

  useEffect(() => {
    const handleResize = () => {
      const image = document.getElementById('certificate-image');
      if (image) {
        const newFontSize = Math.max(20, image.clientWidth / 10);
        setDynamicFontSize(newFontSize);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <img
        id="certificate-image"
        src={previewImage}
        alt="Certificate_Image"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="font-bold"
          style={{ fontFamily: fontFamily, fontSize: `${dynamicFontSize}px` }}
        >
          {name}
        </h1>
      </div>
    </div>
  );
};

export default Certificate;

import { useEffect, useState } from 'react';

const Certificate = ({
  previewImage,
  name,
  fontFamily = 'Dancing Script',
  initialFontSize = 40,
}: any) => {
  const [dynamicFontSize, setDynamicFontSize] = useState(initialFontSize);
  const [userFontSize, setUserFontSize] = useState(initialFontSize);

  useEffect(() => {
    const handleResize = () => {
      const image = document.getElementById('certificate-image');
      if (image) {
        const imageWidth = image.clientWidth;
        let newFontSize = Math.max(20, imageWidth / 10); // Dynamically calculate font size

        if (window.innerWidth >= 1340) {
          newFontSize *= 0.8; // Adjust based on screen width
        }

        setDynamicFontSize(newFontSize);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setUserFontSize(newSize);
  };

  return (
    <div className="relative h-full w-full">
      {/* Image rendering */}
      <img
        id="certificate-image"
        src={previewImage}
        alt="Certificate_Image"
        className="h-full w-full object-cover"
      />
      {/* Name rendering */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="font-bold"
          style={{
            fontFamily: fontFamily,
            fontSize: `${userFontSize || dynamicFontSize}px`, // Use user-defined or dynamic size
          }}
        >
          {name}
        </h1>
      </div>

      {/* Font size control */}
      <div className="absolute bottom-4 right-4">
        <label htmlFor="font-size-slider">Font Size: </label>
        <input
          type="range"
          id="font-size-slider"
          min="20"
          max="100"
          value={userFontSize}
          onChange={handleFontSizeChange}
          className="ml-2"
        />
        <span className="ml-2">{userFontSize}px</span>
      </div>
    </div>
  );
};

export default Certificate;

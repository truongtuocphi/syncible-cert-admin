import { useEffect, useState } from 'react';

const Certificate = ({ previewImage, name, fontFamily = 'Dancing Script', fontsize = 40 }: any) => {
  const [userFontSize, setUserFontSize] = useState(fontsize);

  useEffect(() => {
    const handleResize = () => {
      const image = document.getElementById('certificate-image');
      if (image) {
        const imageWidth = image.clientWidth;
        let newFontSize = Math.max(20, imageWidth / 10); // Tính kích thước chữ động

        if (window.innerWidth >= 1340) {
          newFontSize *= 0.8; // Điều chỉnh theo độ rộng màn hình
        }

        setUserFontSize(newFontSize);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Gọi khi component mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Kiểm tra xem URL có chứa "mintnft" không
  const finalFontSize = window.location.pathname.includes('mintnft')
    ? `${fontsize}px`
    : `${userFontSize}px`;

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
            fontSize: finalFontSize, // Sử dụng kích thước chữ theo URL
          }}
        >
          {name}
        </h1>
      </div>
    </div>
  );
};

export default Certificate;

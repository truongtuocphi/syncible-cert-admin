import Image from 'next/image';

export default function SectionOurVision() {
  return (
    <div className="px-6 py-6 md:px-8 md:py-0 xl:px-24" id="about">
      <div className="flex flex-col items-center gap-8 px-6 py-6 lg:flex-row">
        <div className="w-full basis-1/2">
          <div className="flex flex-col gap-4 antialiased">
            <h1 className="font-playfair text-[2rem] font-[600]">Tầm nhìn</h1>
            <div className="w-full text-wrap font-inter lg:w-[85%]">
              Syncible nhằm tạo ra một sự thay đổi toàn diện trong việc công nhận thành tích học
              tập, vượt qua các ranh giới địa lý và thủ tục hành chính, cho phép sinh viên trình bày
              kỹ năng của mình một cách minh bạch và đáng tin cậy với các nhà tuyển dụng và cơ sở
              giáo dục.
            </div>
          </div>
        </div>
        <div className="w-full basis-1/2">
          <div className="flex h-[29rem] justify-center gap-4">
            <div className="aspect-[1/2] max-h-[80%] self-end overflow-hidden rounded-[1.25rem] shadow-combinedShadow2">
              <Image
                src="/place_holder_photo_1.png"
                alt="placeholder photo 1"
                fill
                className="h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

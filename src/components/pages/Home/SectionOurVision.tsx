import Image from 'next/image';

import { inter, playfair } from '@/components/ui/fonts';

export default function SectionOurVision() {
  return (
    <div className="px-6 py-6 md:px-8 md:py-0 xl:px-24" id="about">
      <div className="flex flex-col items-center gap-8 px-6 py-6 lg:flex-row">
        <div className="w-full basis-[60%]">
          <div className="flex flex-col gap-4 antialiased">
            <h1 className={`${playfair.className} text-[2rem] font-[600]`}>Tầm nhìn</h1>
            <div className={`${inter.className} font-inter w-full text-wrap lg:w-[85%]`}>
              Syncible nhằm tạo ra một sự thay đổi toàn diện trong việc công nhận thành tích học
              tập, vượt qua các ranh giới địa lý và thủ tục hành chính, cho phép sinh viên trình bày
              kỹ năng của mình một cách minh bạch và đáng tin cậy với các nhà tuyển dụng và cơ sở
              giáo dục.
            </div>
          </div>
        </div>
        <div className="w-full basis-[40%]">
          <div className="overflow-hidden rounded-[1.25rem] shadow-combinedShadow2">
            <Image
              src="/place_holder_photo_5.webp"
              alt="placeholder photo 5"
              fill
              className="h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

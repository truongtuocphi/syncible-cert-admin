import Image from 'next/image';

import { inter, playfair } from '@/components/ui/fonts';

export default function SectionOurVision() {
  return (
    <div className="px-6 py-6 md:px-8 md:py-8 xl:px-16 xl:py-16" id="about">
      <div className="flex flex-col items-center gap-20 rounded-b-[100px] border-b-2 border-white bg-gradient-to-t from-white/50 px-16 py-28 lg:flex-row">
        <div className="w-full basis-1/2">
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
        <div className="w-full max-w-[30rem] basis-1/2">
          <Image
            src="/img03.png"
            alt="placeholder photo 5"
            sizes="100vw"
            fill
            className="h-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}

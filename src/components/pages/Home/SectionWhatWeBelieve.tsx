import Image from 'next/image';

import { inter, playfair } from '@/components/ui/fonts';

import SyncibleLogoOnly from '../../../../public/SyncileLogoOnly.svg';

export default function SectionWhatWeBelieve() {
  return (
    <div className="relative px-6 py-6 md:px-8 md:py-0 xl:px-[6.5rem]">
      <div className="relative">
        <div className="absolute left-0 right-0 top-0 z-0 h-full w-full px-6 py-6">
          <div className="relative h-full w-full">
            <div className="absolute -left-[5.9rem] -top-[6rem] z-0 h-[6.5rem] lg:h-[12.5rem]">
              <SyncibleLogoOnly className="h-full w-full" />
            </div>
            <div className="absolute -right-[5.3rem] top-1/2 z-0 h-[4.5rem] lg:h-[8.625rem] ">
              <SyncibleLogoOnly className="h-full w-full blur-[2px]" />
            </div>
            <div className="absolute left-0 right-0 top-0 z-10 h-full w-full overflow-hidden rounded-[2rem] border border-[#F0F0F0]">
              <div className="h-full w-full  overflow-hidden bg-white/50 backdrop-blur-[25px]"></div>
            </div>
            <div className="absolute bottom-0 left-1/2 z-10 h-[6.375rem] -translate-x-1/2 translate-y-1/2">
              <SyncibleLogoOnly className="h-full w-full" />
            </div>
          </div>
        </div>
        <div className="relative z-30 flex flex-col items-center gap-10 p-20 lg:flex-row">
          <div className="h-full w-full basis-1/2">
            <Image
              src="/img02.png"
              alt="placeholder photo 4"
              sizes="100vw"
              fill
              className="h-full object-cover"
              priority
            />
          </div>
          <div className="w-full basis-1/2">
            <div className="flex flex-col gap-4 antialiased">
              <h1 className={`${playfair.className} text-[2rem] font-[600]`}>Chúng tôi tin rằng</h1>
              <div className={`${inter.className} font-inter w-full text-wrap`}>
                Bằng cách mã hóa các bằng cấp, chứng chỉ và thành tích giáo dục, chúng tôi giúp học
                sinh xây dựng <span className="font-bold">&nbsp;một hồ sơ số xác thực,</span> có thể
                kiểm chứng, cung cấp cái nhìn toàn diện về kỹ năng và kiến thức của họ. Syncible rút
                ngắn thời gian cấp chứng chỉ, giảm chi phí in ấn và phí giáo dục, đồng thời loại bỏ
                nhu cầu thu hồi tài liệu vật lý hoặc gửi chúng qua đường bưu điện.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

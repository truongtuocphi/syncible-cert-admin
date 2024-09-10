import Image from 'next/image';

import { inter, playfair } from '@/components/ui/fonts';

export default function SectionAbout() {
  return (
    <div className="px-6 py-6 md:px-8 md:py-8 xl:px-16 xl:py-16" id="about">
      <div className="flex flex-col items-center gap-8 rounded-t-[100px] border-t-2 border-white bg-gradient-to-b from-white/50 px-16 py-[6.6rem] lg:flex-row">
        <div className="w-full basis-1/2">
          <div className="flex flex-col gap-4 antialiased">
            <h1 className={`${playfair.className} text-[2rem] font-[600]`}>
              Giới thiệu về chúng tôi
            </h1>
            <div className={`${inter.className}w-full font-inter text-wrap lg:w-[85%]`}>
              Syncible là một nền tảng tiên phong cung cấp chứng chỉ NFT an toàn và minh bạch cho
              <span className="font-bold">&nbsp;các đối tác</span> như trong nhiều lĩnh vực khác gồm
              gồm giáo dục, doanh nghiệp và các tổ chức phi lợi nhuận. Syncible đảm bảo tính xác
              thực và toàn vẹn của các chứng chỉ số, giúp giảm thiểu nguy cơ làm giả và nâng cao uy
              tín của các tổ chức cấp chứng chỉ.
            </div>
          </div>
        </div>
        <div className="h-full w-full basis-1/2">
          {/* <div className="flex h-[29rem] justify-center gap-4">
            <div className="aspect-[1/2] max-h-[80%] self-end overflow-hidden rounded-[1.25rem] shadow-combinedShadow2">
              <Image
                src="/place_holder_photo_1.png"
                alt="placeholder photo 1"
                fill
                sizes="100vw"
                className="h-full object-cover"
                priority
              />
            </div>
            <div className="aspect-[1/2] max-h-[80%] overflow-hidden rounded-[1.25rem] shadow-combinedShadow2">
              <Image
                src="/place_holder_photo_2.png"
                alt="placeholder photo 2"
                fill
                sizes="100vw"
                className="h-full object-cover"
                priority
              />
            </div>
            <div className="aspect-[1/2] max-h-[80%] self-center overflow-hidden rounded-[1.25rem] shadow-combinedShadow2">
              <Image
                src="/place_holder_photo_3.png"
                alt="placeholder photo 3"
                fill
                sizes="100vw"
                className="h-full object-cover"
                priority
              />
            </div>
          </div> */}
          <Image
            src="/img01.png"
            alt="placeholder photo 1"
            fill
            sizes="100vw"
            className="h-[110%]  object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default function SectionWhatWeBelieve() {
  return (
    <div className="px-6 py-6 md:px-8 md:py-0 xl:px-24">
      <div className="px-6 py-6">
        <div className="flex flex-col items-center gap-8 bg-white lg:flex-row p-20 shadow-combinedShadow2 rounded-[2rem]">
          <div className="w-full basis-1/2"></div>
          <div className="w-full basis-1/2">
            <div className="flex flex-col gap-4 antialiased">
              <h1 className="font-playfair text-[2rem] font-[600]">Chúng tôi tin rằng</h1>
              <div className="w-full text-wrap font-inter lg:w-[85%]">
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

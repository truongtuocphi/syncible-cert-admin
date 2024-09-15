'use client';
import Autoplay from 'embla-carousel-autoplay';

import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { montserrat } from '@/components/ui/fonts';

import SyncibleLogo from '/public/syncible-logo.svg';
import PlaceholderPhoto from '/public/cert-template.png';

const ListNews = [
  {
    title: 'Course content',
    agency_name: 'VnExpress',
    date: '2022-10-10',
    content:
      'Nếu bạn đang muốn tìm hiểu về lĩnh vực này, tôi khuyên bạn nên tham gia khóa học này. Nội dung khóa học rất cập nhật và phù hợp với những người mới bắt đầu.',
    author: {
      name: 'Nguyễn Văn A',
      avatar: 'https://picsum.photos/200/300',
      position: 'Thành viên',
    },
  },
  {
    title: 'Course content',
    agency_name: 'Soha',
    date: '2022-10-10',
    content:
      'Khóa học này thực sự đã mở ra cho tôi một chân trời mới. Tôi rất thích cách giảng viên truyền đạt kiến thức một cách sinh động và dễ hiểu.',
    author: {
      name: 'Nguyễn Văn B',
      avatar: 'https://picsum.photos/200/300',
      position: 'Thành viên',
    },
  },
  {
    title: 'Course content',
    agency_name: 'BBC VN',
    date: '2022-10-10',
    content:
      'Nếu bạn đang muốn tìm hiểu về lĩnh vực này, tôi khuyên bạn nên tham gia khóa học này. Nội dung khóa học rất cập nhật và phù hợp với những người mới bắt đầu.',
    author: {
      name: 'Nguyễn Văn C',
      avatar: 'https://picsum.photos/200/300',
      position: 'Thành viên',
    },
  },
  {
    title: 'Course content',
    agency_name: 'Thanh Niên',
    date: '2022-10-10',
    content:
      'Tham gia khóa học đã giúp tôi hiểu rõ hơn về cách áp dụng kiến thức vào thực tế. Các bài giảng chi tiết và phần thực hành rất bổ ích, khiến tôi cảm thấy tự tin hơn trong công việc.',
    author: {
      name: 'Nguyễn Văn D',
      avatar: 'https://picsum.photos/200/300',
      position: 'Thành viên',
    },
  },
  {
    title: 'Course content',
    agency_name: 'Người Lao Động',
    date: '2022-10-10',
    content:
      'Nếu bạn đang muốn tìm hiểu về lĩnh vực này, tôi khuyên bạn nên tham gia khóa học này. Nội dung khóa học rất cập nhật và phù hợp với những người mới bắt đầu.',
    author: {
      name: 'Nguyễn Văn E',
      avatar: 'https://picsum.photos/200/300',
      position: 'Thành viên',
    },
  },
  {
    title: 'Course content',
    agency_name: 'Tuổi Trẻ',
    date: '2022-11-12',
    content:
      'Tham gia khóa học đã giúp tôi hiểu rõ hơn về cách áp dụng kiến thức vào thực tế. Các bài giảng chi tiết và phần thực hành rất bổ ích, khiến tôi cảm thấy tự tin hơn trong công việc.',
    author: {
      name: 'Nguyễn Văn F',
      avatar: 'https://picsum.photos/200/300',
      position: 'Thành viên',
    },
  },
  {
    title: 'TCourse content',
    agency_name: 'VTC News',
    date: '2022-11-15',
    content:
      'Khóa học này thực sự đã thay đổi cách nhìn của tôi về công nghệ. Tôi đã học được rất nhiều kỹ năng mới mà trước đây chưa từng nghĩ mình có thể sử dụng trong thực tế.',
    author: {
      name: 'Nguyễn Văn G',
      avatar: 'https://picsum.photos/200/300',
      position: 'Thành viên',
    },
  },
  {
    title: 'Course content',
    agency_name: 'Zing News',
    date: '2022-11-18',
    content:
      'Giáo trình rõ ràng và dễ hiểu, cộng với sự hướng dẫn nhiệt tình của giảng viên, đã giúp tôi nhanh chóng tiếp thu kiến thức. Tôi cảm thấy hài lòng với trải nghiệm học tập tại đây.',
    author: {
      name: 'Nguyễn Văn H',
      avatar: 'https://picsum.photos/200/300',
      position: 'Thành viên',
    },
  },
  {
    title: 'Course content',
    agency_name: 'Công An Nhân Dân',
    date: '2022-11-20',
    content:
      'Điều tôi đánh giá cao nhất về khóa học này là tính thực tế của nó. Những kiến thức và kỹ năng mà tôi học được đã giúp tôi xử lý các tình huống phức tạp trong công việc hàng ngày.',
    author: {
      name: 'Nguyễn Văn I',
      avatar: 'https://picsum.photos/200/300',
      position: 'Thành viên',
    },
  },
  {
    title: 'Course content',
    agency_name: 'Báo Mới',
    date: '2022-11-22',
    content:
      'Khóa học này không chỉ cung cấp kiến thức chuyên môn mà còn tạo cơ hội cho tôi gặp gỡ và học hỏi từ các chuyên gia trong lĩnh vực. Một trải nghiệm học tập tuyệt vời và bổ ích.',
    author: {
      name: 'Nguyễn Văn J',
      avatar: 'https://picsum.photos/200/300',
      position: 'Thành viên',
    },
  },
];

export default function SectionNews() {
  return (
    <div className={`${montserrat.className} w-full max-w-[90rem]`} id="news">
      <div className="flex flex-col items-center gap-8 px-4 py-4 md:px-8 md:py-8 xl:px-16 xl:py-16 ">
        <div className=" text-4xl font-semibold">News</div>
        <Carousel
          opts={{ align: 'start', startIndex: 1, loop: false }}
          // plugins={[
          //   Autoplay({
          //     delay: 5000,
          //   }),
          // ]}
          className="w-full"
        >
          <div className="flex flex-col justify-center">
            <CarouselContent className="pb-8 md:-ml-6">
              {ListNews.map((entry, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2 md:pl-6 lg:basis-1/3">
                  <Card className="h-full rounded-[1.25rem] shadow-combinedShadow2">
                    <CardHeader>
                      <CardTitle className="max-w-28">
                        <SyncibleLogo className="h-full max-h-8 w-full" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="">
                      <div className="flex flex-col gap-4">
                        <div className="max-h-40 w-full overflow-hidden rounded-xl">
                          <Image
                            src={PlaceholderPhoto}
                            alt="placeholder photo"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="aspect-[2/1] object-cover"
                          />
                        </div>
                        <div className={``}>
                          <div className="text-2xl font-bold">{entry.title}</div>
                          <div className="line-clamp-3 text-lg text-[#A2A3A9]">{entry.content}</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex w-full gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={entry.author.avatar} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className={` flex w-full flex-col justify-center`}>
                          <div className="text-lg font-bold">{entry.author.name}</div>
                          <div className="text-base font-medium text-[#A2A3A9]">
                            {entry.author.position}
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4">
              <CarouselPrevious className="static right-auto top-auto h-12 w-12 translate-y-0 rounded-xl border-none shadow-combinedShadow2" />
              <CarouselNext className="static left-auto top-auto h-12 w-12 translate-y-0 rounded-xl border-none shadow-combinedShadow2" />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

'use client';
import Autoplay from 'embla-carousel-autoplay';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { roboto, inter } from '@/components/ui/fonts';

const ListNews = [
  {
    title: 'Tin tức 1',
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
    title: 'Tin tức 2',
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
    title: 'Tin tức 3',
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
    title: 'Tin tức 4',
    agency_name: 'Thanh Niên',
    date: '2022-10-10',
    content:
      'Tuyệt vời.',
    author: {
      name: 'Nguyễn Văn D',
      avatar: 'https://picsum.photos/200/300',
      position: 'Thành viên',
    },
  },
  {
    title: 'Tin tức 5',
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
    title: 'Tin tức 6',
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
    title: 'Tin tức 7',
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
    title: 'Tin tức 8',
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
    title: 'Tin tức 9',
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
    title: 'Tin tức 10',
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
    <div className="w-full max-w-[90rem]" id="news">
      <div className="flex flex-col items-center gap-8">
        <div className=" text-4xl font-semibold">Tin tức</div>
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
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>{entry.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="">
                      <div className="line-clamp-3 h-[4.5rem]">{entry.content}</div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex w-full gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={entry.author.avatar} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className={`${roboto.className} flex w-full flex-col justify-center`}>
                          <div className="text-lg">{entry.author.name}</div>
                          <div className="text-base text-[#A2A3A9]">{entry.author.position}</div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4">
              <CarouselPrevious className="static right-auto top-auto h-12 w-12 translate-y-0 rounded-xl" />
              <CarouselNext className="static left-auto top-auto h-12 w-12 translate-y-0 rounded-xl" />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

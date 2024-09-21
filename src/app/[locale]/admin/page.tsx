import Card from '@/components/pages/admin/Card';
import { BiFile } from 'react-icons/bi';
import { BiCustomize } from 'react-icons/bi';
import { GrCertificate } from 'react-icons/gr';

const listCard = [
  {
    title: 'Tùy chỉnh mẫu chứng chỉ',
    des: 'Chỉnh sửa giao diện và chuyên về chủ đề của riêng bạn. Thêm logo, màu sắc và hình ảnh của bạn để phản ánh thương hiệu của bạn.',
    icon: <BiFile className="text-2xl text-gray-800" />,
    titleButton: 'Tùy chỉnh ở đây',
    link: '/admin/customized',
  },
  {
    title: 'Quản lý Chứng chỉ',
    des: 'Quản lý chứng chỉ số được đúc của bạn tại đây',
    icon: <BiCustomize className="text-2xl text-gray-800" />,
    titleButton: 'Tạo ngay',
    link: '/admin/collection',
  },
  {
    title: 'Tạo chứng chỉ',
    des: 'Tạo chứng chỉ của bạn',
    icon: <GrCertificate className="text-2xl text-gray-800" />,
    titleButton: 'Tạo chứng chỉ số',
    link: '/admin/mintnft',
  },
];

const HomeAdmin = () => {
  return (
    <div className="flex w-full flex-col">
      <div>
        <h1 className="mb-3 text-3xl font-bold text-gray-700">Chào mừng bạn đến với Syncible</h1>
        <p className="text-sm font-semibold text-gray-500">
          Tạo chứng chỉ của riêng bạn một cách dễ dàng hơn với các bước bên dưới
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {listCard.map((item, index) => {
          return <Card data={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default HomeAdmin;

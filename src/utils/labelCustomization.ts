import { useTranslations } from 'next-intl';

const t = useTranslations('HomePage.title_section');

const getCustomLabel = (path: string) => {
  switch (path) {
    case 'mintnft':
      return 'Tạo chứng chỉ số';
    case 'collection':
      return 'Quản lý chứng chỉ';
    case 'createcollection':
      return 'Tạo mục quản lý';
    case 'admin':
      return 'Trang chủ';
    case 'collectiondetail':
      return '';
    case 'contractdetail':
      return 'Chi tiết hợp đồng';
    case 'filestorage':
      return 'Thư mục lưu trữ';
    case 'customized':
      return 'Tùy chỉnh mẫu';
    case 'vi':
      return '';
    case 'en':
      return '';
    default:
      return path;
  }
};

export default getCustomLabel;

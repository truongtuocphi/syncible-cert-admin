const getCustomLabel = (path: string) => {
  switch (path) {
    case 'mintnft':
      return 'Tạo Chứng Chỉ Số';
    case 'collection':
      return 'Quản Lý Chứng Chỉ';
    case 'createcollection':
      return 'Tạo Mục Quản Lý';
    case 'admin':
      return 'Trang Chủ';
    case 'collectiondetail':
      return '';
    case 'contractdetail':
      return 'Chi tiết hợp đồng';
    case 'filestorage':
      return 'Thư Mục Lưu Trữ';
    case 'customized':
      return 'Tùy Chỉnh Mẫu';
    case 'vi':
      return '';
    case 'en':
      return '';
    default:
      return path;
  }
};

export default getCustomLabel;

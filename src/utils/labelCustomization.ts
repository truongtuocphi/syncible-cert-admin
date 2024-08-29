const getCustomLabel = (path: string) => {
  switch (path) {
    case 'mintnft':
      return 'Đúc Chứng Chỉ Số';
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
    default:
      return path;
  }
};

export default getCustomLabel;

export default function getAcronym(orgName: string | undefined): string {
  if (!orgName) {
    return '';
  }

  // Tách chuỗi thành các từ
  const words = orgName.split(' ');

  // Lấy chữ cái đầu tiên của mỗi từ
  const acronym = words.map((word) => word.charAt(0)).join('');

  return acronym.toUpperCase(); // Chuyển đổi thành chữ hoa
}

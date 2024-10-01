// Helper function to remove diacritics from Vietnamese text
export function generateIdFromText(text: string): string {
  return text
    .normalize('NFD') // Decompose combined graphemes into individual characters
    .replace(/[\u0300-\u036f]/g, '') // Remove all diacritics
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ''); // Remove any remaining invalid characters
}

export function addIdsToHeadings(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const headings = doc.querySelectorAll('h2:not([id])');

  headings.forEach((heading) => {
    const textContent = heading.textContent || '';

    const id = generateIdFromText(textContent);

    heading.id = id;
  });

  return doc.body.innerHTML;
}

export function getH2TagsWithAttributes(content: string): string[] {
  // Khởi tạo mảng để chứa các thẻ h2 đầy đủ (bao gồm cả thuộc tính và nội dung)
  const h2Tags: string[] = [];

  // Biểu thức chính quy để bắt tất cả các thẻ h2, bao gồm cả thuộc tính
  const regex = /<h2[^>]*>.*?<\/h2>/g;
  let match: RegExpExecArray | null;

  // Duyệt qua tất cả các kết quả khớp với regex
  while ((match = regex.exec(content)) !== null) {
    if (match[0]) {
      h2Tags.push(match[0]); // Lưu toàn bộ thẻ h2 bao gồm cả thuộc tính và nội dung
    }
  }

  // Chuyển đổi mảng h2Tags thành thẻ a
  const h2Links: string[] = h2Tags
    .map((h2) => {
      // Biểu thức chính quy để tìm thuộc tính id
      const idMatch = /id=["']([^"']+)["']/.exec(h2);
      const textMatch = />(.*?)<\/h2>/.exec(h2); // Tìm nội dung bên trong thẻ h2

      if (idMatch && textMatch) {
        const id = idMatch[1]; // Giá trị id
        const text = textMatch[1]; // Nội dung thẻ h2

        // Tạo thẻ a với href và nội dung
        return `<a href="#${id}">${text}</a>`;
      }

      return ''; // Nếu không có id, trả về chuỗi rỗng
    })
    .filter((link) => link); // Lọc các thẻ a rỗng

  // Trả về mảng chứa các thẻ a
  return h2Links;
}

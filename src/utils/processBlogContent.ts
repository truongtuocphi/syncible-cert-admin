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
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

  headings.forEach((heading) => {
    const textContent = heading.textContent || '';
    const id = generateIdFromText(textContent);
    heading.id = id; // Assign the generated ID to the heading
  });

  return { html: doc.body.innerHTML, doc }; // Return both updated HTML and the document
}

export function generateTOC(doc: Document) {
  const toc: { id: string; text: string }[] = [];
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((heading) => {
    const id = heading.id;
    const text = heading.textContent || '';
    toc.push({ id, text });
  });
  return toc;
}

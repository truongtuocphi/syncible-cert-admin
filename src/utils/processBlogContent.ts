// Helper function to remove diacritics from Vietnamese text
export function generateIdFromText(text: string): string {
  return text
    .normalize('NFD') // Decompose combined graphemes into individual characters
    .replace(/[\u0300-\u036f]/g, '')// Remove all diacritics
    .replace(/^[^a-zA-Z]+/, '') // Remove any leading non-alphabetic characters
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove any remaining invalid characters
}

export function addIdsToHeadings(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

  const headingClasses: Record<string, string> = {
    h1: 'text-4xl font-bold my-4 scroll-mt-[120px]',   // Example classes for h1
    h2: 'text-3xl font-bold my-4 scroll-mt-[120px]', // Example classes for h2
    h3: 'text-2xl font-bold my-3 scroll-mt-[120px]',  // Example classes for h3
    h4: 'text-xl font-semibold my-3 scroll-mt-[120px]',   // Example classes for h4
    h5: 'text-lg font-semibold my-2 scroll-mt-[120px]',   // Example classes for h5
    h6: 'text-base font-medium my-2 scroll-mt-[120px]', // Example classes for h6
  };

  headings.forEach((heading) => {
    // const textContent = heading.textContent || '';
    // const id = generateIdFromText(textContent);
    // heading.id = id; 
    const tagName = heading.tagName.toLowerCase();
    const textContent = heading.textContent || '';
    const id = generateIdFromText(textContent);
    heading.id = id; // Assign the generated ID to the heading

    // Add the corresponding Tailwind classes to the heading
    const className = headingClasses[tagName] || '';
    heading.className = `${className}`;
  });

  return { html: doc.body.innerHTML, doc }; // Return both updated HTML and the document
}

export function generateTOC(doc: Document) {
  const toc: { id: string; text: string; }[] = [];
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((heading) => {
    const id = heading.id;
    const text = heading.textContent || '';
    toc.push({ id, text });
  });
  return toc;
}
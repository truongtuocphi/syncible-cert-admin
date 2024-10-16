// Helper function to remove diacritics from Vietnamese text
export function generateIdFromText(text: string): string {
  return text
    .normalize('NFD') // Decompose combined graphemes into individual characters
    .replace(/[\u0300-\u036f]/g, '')// Remove all diacritics
    .replace(/^[^a-zA-Z]+/, '') // Remove any leading non-alphabetic characters
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ''); // Remove any remaining invalid characters
}

export function addIdsToHeadings(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

  const headingClasses: Record<string, string> = {
    h1: 'text-5xl font-bold my-4 scroll-mt-[9rem]',   
    h2: 'text-4xl font-bold my-4 scroll-mt-[9rem]', 
    h3: 'text-3xl font-bold my-3 scroll-mt-[9rem]',  
    h4: 'text-2xl font-semibold my-3 scroll-mt-[9rem]',   
    h5: 'text-xl font-semibold my-2 scroll-mt-[9rem]',   
    h6: 'text-lg font-medium my-2 scroll-mt-[9rem]', 
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
  const toc: { id: string; text: string, tagName: string }[] = [];
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((heading) => {
    const id = heading.id;
    const text = heading.textContent || '';
    const tagName = heading.tagName.toLowerCase();
    toc.push({ id, text, tagName });
  });
  return toc;
}

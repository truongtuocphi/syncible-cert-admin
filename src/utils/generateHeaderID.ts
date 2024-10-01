// Helper function to remove diacritics from Vietnamese text
export default function generateIdFromText(text: string): string {
    return text
      .normalize('NFD') // Decompose combined graphemes into individual characters
      .replace(/[\u0300-\u036f]/g, '') // Remove all diacritics
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, ''); // Remove any remaining invalid characters
  }
  
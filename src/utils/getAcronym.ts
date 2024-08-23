export default function getAcronym(orgName: string | undefined): string {
  if (!orgName) {
    return '';
  }

  const words = orgName.split(' ');

  const acronym = words.map((word) => word.charAt(0)).join('');

  return acronym.toUpperCase();
}

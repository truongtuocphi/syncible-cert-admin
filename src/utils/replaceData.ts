export default function replaceData(originalString: string, issuedDate: string) {
  const date = new Date(issuedDate);
  const formattedDate = `${String(date.getFullYear()).slice(2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

  const updatedString = originalString.replace('NNaNNaN', formattedDate);

  return updatedString;
}

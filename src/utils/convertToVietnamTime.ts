export default function convertToVietnamTime(isoString: string | undefined): string {
  if (!isoString) {
    return '';
  }

  const date = new Date(isoString);

  const vietnamOffset = 7 * 60;
  const localTime = new Date(date.getTime() + vietnamOffset * 60 * 1000);

  const day = localTime.getUTCDate();
  const month = localTime.getUTCMonth() + 1;
  const year = localTime.getUTCFullYear();
  const hours = localTime.getUTCHours();
  const minutes = localTime.getUTCMinutes();
  const seconds = localTime.getUTCSeconds();

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

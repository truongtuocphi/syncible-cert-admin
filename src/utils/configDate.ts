function configDate(dateString: string) {
  const dates = dateString.split(' - ');
  const startDate = new Date(dates[0]);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };

  const formattedDate = startDate.toLocaleDateString('en-US', options);

  return formattedDate;
}

export default configDate;

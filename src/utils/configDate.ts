function configDate(dateString: any) {
  const dates = dateString.split(' - ');
  const startDate = new Date(dates[0]);

  const startDay = startDate.getDate();
  const month = startDate.getMonth() + 1;
  const year = startDate.getFullYear();

  return `Day ${startDay} month ${month} year ${year}`;
}

export default configDate;

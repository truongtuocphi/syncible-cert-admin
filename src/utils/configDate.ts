function configDate(dateString: any) {
  const dates = dateString.split(' - ');
  const startDate = new Date(dates[0]);
  const endDate = new Date(dates[1]);

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const month = startDate.getMonth() + 1; // getMonth() returns 0-based index
  const year = startDate.getFullYear();

  return `Ngày ${startDay} tháng ${month} năm ${year}`;
}

export default configDate;

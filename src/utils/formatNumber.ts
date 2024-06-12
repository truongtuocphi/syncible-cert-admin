export const beautifulNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
  if (number == undefined) return 0;
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  };
  if (Number.isInteger(number)) {
    return parseInt(number + '').toLocaleString('en', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  } else {
    return parseFloat(number + '').toLocaleString('en', options);
  }
};

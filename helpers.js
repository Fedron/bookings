const getDatesBetween = (startDate, endDate) => {
  const dates = [];

  let currentDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );

  while (currentDate <= endDate) {
    dates.push(currentDate);

    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    );
  }

  return dates;
};

export { getDatesBetween };
const GetWeekNumber = (date: Date) => {
  const dt = new Date(date);
  dt.setUTCDate(dt.getUTCDate() + 4 - (dt.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(dt.getUTCFullYear(), 0, 1));
  return Math.ceil((((dt.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};


const GetWeeksOfYear = (year: number): Array<{
  mondayISO: string; sundayISO: string; mondayDate: Date; sundayDate: Date; weekNumber: number
}> => {


  const dates = [];
  const firstDayOfYear = new Date(Date.UTC(year, 0, 1));
  const firstMonday = new Date(firstDayOfYear);

  // Adjust to find the first Monday of the year
  const dayOfWeek = firstMonday.getUTCDay();
  const diffToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // If it's Sunday, move to the next Monday
  firstMonday.setUTCDate(firstMonday.getUTCDate() + (dayOfWeek === 0 ? 1 : -diffToMonday));

  // Iterate through the year to get each Monday and Sunday
  for (let date = new Date(firstMonday); date.getUTCFullYear() === year; date.setUTCDate(date.getUTCDate() + 7)) {
    const mondayStart = new Date(date);
    mondayStart.setUTCHours(0, 0, 0, 0); // Start of the day (Monday)

    const sundayEnd = new Date(date);
    sundayEnd.setUTCDate(sundayEnd.getUTCDate() + 6);
    sundayEnd.setUTCHours(23, 59, 59, 999); // End of the day (Sunday)

    // Check if Sunday is still within the current year
    if (sundayEnd.getUTCFullYear() !== year) {
      break;
    }

    dates.push({
      mondayISO: mondayStart.toISOString(),
      sundayISO: sundayEnd.toISOString(),

      mondayDate: mondayStart,
      sundayDate: sundayEnd,

      weekNumber: GetWeekNumber(mondayStart)
    });
  }

  return dates;


};

export default GetWeeksOfYear;

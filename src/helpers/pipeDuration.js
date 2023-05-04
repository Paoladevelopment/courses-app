export const getHoursDuration = (num) => {
  const hours = Math.floor(num / 60);
  const mins = num % 60;
  return `${hours}:${mins}`;
};

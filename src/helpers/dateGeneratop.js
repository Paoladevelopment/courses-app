export const getDateInFormat = (date) => {
  return date.replace(/\//g, '.');
};

export const dateGeneratop = () => {
  const currentDate = new Date();
  return `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
};

export const generateYearArray = () => {
  try {
    const currentYear = new Date().getFullYear();
    let _yearArray = [];

    for (let i = currentYear; i > 1936; i--) {
      _yearArray.push({
        label: i,
        value: i,
      });
    }

    return _yearArray;
  } catch (err) {
    console.log(err);
  }
};

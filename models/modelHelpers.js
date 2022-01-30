const firstUpper = (rawValue) => {
  try {
    return rawValue
      .split(" ")
      .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join(" ");
  } catch (error) {
    console.log(error);
  }
};

const setLower = (value) => {
  const newValue = value.toLowerCase();
  return newValue;
};

module.exports = {
  firstUpper,
  setLower,
};

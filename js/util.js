const getRandomInt = (min = 1, max = 5) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFraction = (min = 1.101, max = 1.203, count = 2) => Number((Math.random() * (max - min) + min).toFixed(count));
const getRandomArrayElement = (element) => element[getRandomInt(0, element.length - 1)];

export { getRandomInt, getRandomFraction, getRandomArrayElement };

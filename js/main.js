const TITLES = [
  'Милая, уютная квартира в Краснодаре',
  'Просторный дом в Москве',
  'Бунгало в центре столицы',
  'Апартаменты на Юге',
  'Большой дом из кирпича'
];

const ADDRESS = [
  '55.75, 37.62',
  '53.3606, 83.7636',
  '43.34, 56.92',
  '65,40, 40.56',
  '98.98, 100.54'
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow'
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTIONS = [
  'Просто великолепные апартаменты. Бывал там и не раз.',
  'Ничего лишнего. Просторный дом с банькой',
  'И все бы хорошо, да вот жена говорит надо продавать!',
  'Да и рассказать то нечего. Сам я тут не жил. Просто черный риэлтор'
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

const OFFER_COUNT = 11;


const getRandomInt = (min = 1, max = 5) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFraction = (min = 1.101, max = 1.203, count = 2) => Number((Math.random() * (max - min) + min).toFixed(count));
const getRandomArrayElement = (element) => element[getRandomInt(0, element.length - 1)];

let FirstIndexAvatar = 0;

const createaAvatar = () => {
  let path = '';
  FirstIndexAvatar++;
  if (FirstIndexAvatar !== 10 && FirstIndexAvatar < 10) {
    path = `img/avatars/user0${FirstIndexAvatar}.png`;
  } else {
    path = `img/avatars/user${FirstIndexAvatar}.png`;
  }

  return path;
};

const craeteOffer = ()=> ({
  author: {
    avatar: createaAvatar()
  },
  offer: {
    title: getRandomArrayElement(TITLES),
    //address: this.location.x,
    price: getRandomInt(1000, 10000)
  },
  location: {
    x: getRandomFraction(35.65000, 35.70000, 5),
    y: getRandomFraction(139.70000, 139.80000, 5)
  }
});

const offers = new Array(OFFER_COUNT).fill(null).map(() => craeteOffer());

// eslint-disable-next-line no-console
console.log(offers);

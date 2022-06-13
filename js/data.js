import { getRandomInt, getRandomFraction, getRandomArrayElement } from './util.js';

const TITLES = [
  'Милая, уютная квартира в Краснодаре',
  'Просторный дом в Москве',
  'Бунгало в центре столицы',
  'Апартаменты на Юге',
  'Большой дом из кирпича'
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

const MIN_PRICE = 1000;
const MAX_PRICE = 10000;
const MAX_ROOM = 5;
const MAX_GUEST = 4;
const MIN_LONGITUDE = 35.65000;
const MAX_LONGITUDE = 35.70000;
const MIN_LATIITUDE = 35.65000;
const MAX_LATIITUDE = 35.70000;
const NUMBER_COUNT_AFTER_DOT = 5;
const OFFER_ARRAY_COUNT = 10;

const createOfferObject = (i) => {
  const location = {
    x: getRandomFraction(MIN_LONGITUDE, MAX_LONGITUDE, NUMBER_COUNT_AFTER_DOT),
    y: getRandomFraction(MIN_LATIITUDE, MAX_LATIITUDE, NUMBER_COUNT_AFTER_DOT)
  };
  const address = `${location.x} ${location.y}`;
  const features = [];

  for (let j = 0; j <= getRandomInt(0, FEATURES.length - 1); j++) {
    features.push(FEATURES[j]);
  }

  const photos = [];

  for (let k = 0; k <= getRandomInt(0, PHOTOS.length - 1); k++) {
    photos.push(PHOTOS[k]);
  }

  return {
    author: {
      avatar: `img/avatars/user${(i + 1).toString().padStart(2, 0)}.png`
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: address,
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInt(1, MAX_ROOM),
      guests: getRandomInt(1, MAX_GUEST),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: features,
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: photos
    },
    location: location
  };

};

const createOfferArray = () => {
  const offers = [];

  for (let i = 0; i < OFFER_ARRAY_COUNT; i++) {
    const offer = createOfferObject(i);
    offers.push(offer);
  }

  return offers;
};

export { createOfferArray };

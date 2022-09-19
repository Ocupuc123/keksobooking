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
const MIN_LATIITUDE = 139.70000;
const MAX_LATIITUDE = 139.80000;
const NUMBER_COUNT_AFTER_DOT = 5;
const OFFER_COUNT = 8;


const createAvatars = (i) => `img/avatars/user${(i + 1).toString().padStart(2, 0)}.png`;

const createFeatures = () => {
  const features = [];
  for (let i = 0; i <= getRandomInt(0, FEATURES.length - 1); i++) {
    features.push(FEATURES[i]);
  }
  return features;
};

const createPhotos = ()=> {
  const photos = [];
  for (let i = 0; i <= getRandomInt(0, PHOTOS.length - 1); i++) {
    photos.push(PHOTOS[i]);
  }
  return photos;
};

const createOffer = (i) => {
  const locationX = getRandomFraction(MIN_LONGITUDE, MAX_LONGITUDE, NUMBER_COUNT_AFTER_DOT);
  const locationY = getRandomFraction(MIN_LATIITUDE, MAX_LATIITUDE, NUMBER_COUNT_AFTER_DOT);

  return {
    author: {
      avatar: createAvatars(i)
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${locationX} ${locationY}`,
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInt(1, MAX_ROOM),
      guests: getRandomInt(1, MAX_GUEST),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: createFeatures(),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: createPhotos()
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

const createOffers = () => {
  const offers = [];

  for (let i = 0; i < OFFER_COUNT; i++) {
    const offer = createOffer(i);
    offers.push(offer);
  }

  return offers;
};

export { createOffers };

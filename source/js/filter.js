/* global _:readonly */
import { rerenderMarkers } from './map.js';

const DEFAULT_VALUE = 'any';
const SIMILAR_OFFER_COUNT = 10;
const RERENDER_DELAY = 500;
const mapFilterForm = document.querySelector('.map__filters');
const typeSelect = mapFilterForm.querySelector('#housing-type');
const priceSelect = mapFilterForm.querySelector('#housing-price');
const roomsSelect = mapFilterForm.querySelector('#housing-rooms');
const guestsSelect = mapFilterForm.querySelector('#housing-guests');
const featuresListElement = mapFilterForm.querySelector('#housing-features');

const Price = {
  LOW: {
    min: '0',
    max: '10000'
  },
  MIDDLE: {
    min: '10000',
    max: '50000'
  },
  HIGH: {
    min: '50000',
    max: '100000'
  }
};

const checkType = ({ offer }) => offer.type === typeSelect.value || typeSelect.value === DEFAULT_VALUE;
const checkRooms = ({ offer }) => Number(offer.rooms) === Number(roomsSelect.value) || roomsSelect.value === DEFAULT_VALUE;
const checkGuests = ({ offer }) => Number(offer.guests) === Number(guestsSelect.value) || guestsSelect.value === DEFAULT_VALUE;
const checkPrice = ({ offer }) => {
  const currentPrice = priceSelect.value;
  return currentPrice === DEFAULT_VALUE || (offer.price > Price[currentPrice.toUpperCase()].min && offer.price < Price[currentPrice.toUpperCase()].max);
};
const checkFeature = ({ offer }) => {
  const featuresChecked = featuresListElement.querySelectorAll('input:checked');

  if (featuresChecked.length === 0) {
    return true;
  }

  if (offer.features) {
    const offerFeatures = offer.features;
    return Array.from(featuresChecked).every((input) => offerFeatures.includes(input.value));
  }
};

const filterOffers = (offers) => {
  const filteredOffers = [];

  for (const offer of offers) {
    if (filteredOffers.length >= SIMILAR_OFFER_COUNT) {
      break;
    }
    if (
      checkType(offer)
      && checkRooms(offer)
      && checkGuests(offer)
      && checkPrice(offer)
      && checkFeature(offer)) {
      filteredOffers.push(offer);
    }
  }

  return filteredOffers;
};

const mapFilterFormChangeHandler = (offers) => {
  const filteredOffers = filterOffers(offers);
  rerenderMarkers(filteredOffers);
};

const setMapFilterFormListener = (offers) => {
  mapFilterForm.addEventListener('change', _.debounce(
    () => mapFilterFormChangeHandler(offers),
    RERENDER_DELAY,
  ));
  mapFilterForm.addEventListener('reset', _.debounce(
    () => mapFilterFormChangeHandler(offers),
    RERENDER_DELAY,
  ));
};

export { setMapFilterFormListener };

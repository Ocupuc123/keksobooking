import { isLoadMap } from './map.js';

const AD_FORM_DISABLED_CLASS = 'ad-form--disabled';
const MAP_FILTER_DISABLED_CLASS = 'map__filters--disabled';
const MinPrice = {
  PALACE: 10000,
  FLAT: 1000,
  HOUSE: 5000,
  BUNGALOW: 0
};

const mapFilter = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');

if (!isLoadMap) {
  adForm.classList.add(AD_FORM_DISABLED_CLASS);
  mapFilter.classList.add(MAP_FILTER_DISABLED_CLASS);

  const adFormFieldsets = adForm.querySelectorAll('fieldset');

  adFormFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', '');
  });

  const mapFilterFieldsets = mapFilter.querySelectorAll('fieldset');

  mapFilterFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', '');
  });

  const mapFilterSelects = mapFilter.querySelectorAll('select');

  mapFilterSelects.forEach((select) => {
    select.setAttribute('disabled', '');
  });
}

const priceInput = adForm.querySelector('#price');

const setMinValuePrice = (select) => {
  let minValue = 0;

  switch (select.value) {
    case 'palace': {
      minValue = MinPrice.PALACE;
      break;
    }
    case 'flat': {
      minValue = MinPrice.FLAT;
      break;
    }
    case 'house': {
      minValue = MinPrice.HOUSE;
      break;
    }
    case 'bungalow': {
      minValue = MinPrice.BUNGALOW;
      break;
    }
  }

  priceInput.setAttribute('min', minValue);
  priceInput.placeholder = minValue;
};

const typeSelect = adForm.querySelector('#type');
typeSelect.addEventListener('change', () => {
  setMinValuePrice(typeSelect);
});

priceInput.addEventListener('input', () => {
  setMinValuePrice(typeSelect);
});

const synchronizationTime = (evt) => {
  const timeOut = adForm.querySelector('#timeout');
  const timeIn = adForm.querySelector('#timein');

  if (evt.target.matches('#timeout')) {
    timeIn.value = timeOut.value;
  } else if (evt.target.matches('#timein')) {
    timeOut.value = timeIn.value;
  }
};

const timeSelectsElement = adForm.querySelector('.ad-form__element--time');
timeSelectsElement.addEventListener('change', synchronizationTime);

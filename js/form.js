import './form-validation.js';
import { sendData } from './api.js';

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
const adFormResetButton = adForm.querySelector('.ad-form__reset');
const priceInput = adForm.querySelector('#price');
const typeSelect = adForm.querySelector('#type');

const getTypeMinValuePrice = () => {
  switch (typeSelect.value) {
    case 'palace': {
      return MinPrice.PALACE;
    }
    case 'flat': {
      return MinPrice.FLAT;
    }
    case 'house': {
      return MinPrice.HOUSE;
    }
    case 'bungalow': {
      return MinPrice.BUNGALOW;
    }
  }
};

priceInput.setAttribute('min', getTypeMinValuePrice());
priceInput.setAttribute('placeholder', getTypeMinValuePrice());

typeSelect.addEventListener('change', () => {
  priceInput.setAttribute('min', getTypeMinValuePrice());
  priceInput.setAttribute('placeholder', getTypeMinValuePrice());
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

const inactiveStatePage = () => {
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
};

const formReset = () => {
  adForm.reset();
  mapFilter.reset();
};

const formSubmitHandler = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

const formResetButtonHandler = (cb) => {
  adFormResetButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    cb();
  });
};

export { formSubmitHandler, formResetButtonHandler, inactiveStatePage, formReset };

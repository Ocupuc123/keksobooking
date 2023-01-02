import { sendData } from './api.js';
import { resetAvatar, resetHousingPreview } from './upload-preview.js';

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
const mapFilterSelects = mapFilter.querySelectorAll('select');
const mapFilterFieldsets = mapFilter.querySelectorAll('fieldset');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const priceInput = adForm.querySelector('#price');
const typeSelect = adForm.querySelector('#type');
const timeSelectsElement = adForm.querySelector('.ad-form__element--time');
const timeOut = adForm.querySelector('#timeout');
const timeIn = adForm.querySelector('#timein');
const adFormSlider = adForm.querySelector('.ad-form__slider');

const inactiveStatePage = () => {
  adForm.classList.add(AD_FORM_DISABLED_CLASS);
  mapFilter.classList.add(MAP_FILTER_DISABLED_CLASS);

  adFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });

  mapFilterFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });

  mapFilterSelects.forEach((select) => {
    select.disabled = true;
  });
};

const initForm = () => {
  adForm.classList.remove(AD_FORM_DISABLED_CLASS);

  adFormFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

const initFilter = () => {
  mapFilter.classList.remove(MAP_FILTER_DISABLED_CLASS);

  mapFilterFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  mapFilterSelects.forEach((select) => {
    select.disabled = false;
  });
};

const synchronizationTime = (evt) => {
  if (evt.target.matches('#timeout')) {
    timeIn.value = timeOut.value;
  } else if (evt.target.matches('#timein')) {
    timeOut.value = timeIn.value;
  }
};

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

priceInput.min = getTypeMinValuePrice();
priceInput.placeholder = getTypeMinValuePrice();

typeSelect.addEventListener('change', () => {
  priceInput.min = getTypeMinValuePrice();
  priceInput.placeholder = getTypeMinValuePrice();
});

timeSelectsElement.addEventListener('change', synchronizationTime);

const formReset = () => {
  adForm.querySelectorAll('.is-invalid').forEach((invalidElement) => {
    invalidElement.classList.remove('is-invalid');
  });

  adForm.reset();
  mapFilter.reset();
  resetAvatar();
  resetHousingPreview();
};

const setFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

const setFormReset = (cb) => {
  adFormResetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    adFormSlider.noUiSlider.reset();
    cb();
  });
};

export { setFormSubmit, setFormReset, initForm, initFilter, inactiveStatePage, formReset };

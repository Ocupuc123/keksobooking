/* global noUiSlider:readonly */
const slider = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');
const typeSelect = document.querySelector('#type');

const getMinValuePrice = (price) => Number(price.min);
const getMaxValuePrice = (price) => Number(price.max);

const sliderUpdateHandler = (values) => {
  priceInput.value = values;
};

const rangeSlider = () => {
  noUiSlider.create(slider, {
    start: 0,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value)
    },
    range: {
      'min': getMinValuePrice(priceInput),
      'max': getMaxValuePrice(priceInput)
    }
  });

  slider.noUiSlider.on('update', sliderUpdateHandler);

  typeSelect.addEventListener('change', () => {
    slider.noUiSlider.updateOptions({
      range: {
        'min': getMinValuePrice(priceInput),
        'max': getMaxValuePrice(priceInput)
      }
    });
    slider.noUiSlider.set(slider.noUiSlider.get());
  });
};

export { rangeSlider };

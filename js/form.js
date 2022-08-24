const mapFilter = document.querySelector('.map__filters');
const form = document.querySelector('.ad-form');

const mapFilterChangeHandler = (evt) => {
  const targetEvent = evt.target;
  const price = form.querySelector('#price');
  let minValuePrice = 0;

  if (targetEvent.matches('#housing-type')) {
    switch (targetEvent.value) {
      case 'palace':
        minValuePrice = 10000;
        break;
      case 'flat':
        minValuePrice = 1000;
        break;
      case 'house':
        minValuePrice = 5000;
        break;
      case 'bungalow':
        minValuePrice = 0;
    }

    price.setAttribute('min', minValuePrice);
    price.placeholder = minValuePrice;
  }
};

const formChangeHandler = (evt) => {
  const targetEvent = evt.target;
  const timeIn = form.querySelector('#timein');
  const timeOut = form.querySelector('#timeout');

  if (targetEvent.matches('#timein')) {
    timeOut.value = timeIn.value;
  }

  if (targetEvent.matches('#timeout')) {
    timeIn.value = timeOut.value;
  }
};

mapFilter.addEventListener('change', mapFilterChangeHandler);
form.addEventListener('change', formChangeHandler);

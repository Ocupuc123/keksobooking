const ERROR_CLASS = 'is-invalid';
const MAX_PRICE_VALUE = 1000000;
const TitleLength = {
  MIN: 30,
  MAX: 100
};
const RoomsOptions = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

const addErrorClass = (input) => {
  const parentElement = input.parentElement;

  parentElement.classList.add(ERROR_CLASS);
};

const removeErrorClass = (input) => {
  const parentElement = input.parentElement;

  parentElement.classList.remove(ERROR_CLASS);
};

const titleInput = document.querySelector('#title');

titleInput.addEventListener('input', (evt) => {
  const valueLength = titleInput.value.length;

  if (valueLength < TitleLength.MIN) {
    addErrorClass(evt.target);
  } else if (valueLength > TitleLength.MAX) {
    addErrorClass(evt.target);
  } else {
    removeErrorClass(evt.target);
  }

  evt.target.reportValidity();
});

titleInput.addEventListener('invalid', (evt) => {
  if (evt.target.validity.valueMissing) {
    addErrorClass(evt.target);
  }
});

const priceInput = document.querySelector('#price');

priceInput.addEventListener('invalid', (evt) => {
  if (evt.target.validity.valueMissing) {
    addErrorClass(evt.target);
  }
});

priceInput.addEventListener('input', (evt) => {
  const value = +evt.target.value;
  const minValue = +evt.target.getAttribute('min');

  if (value < minValue || value > MAX_PRICE_VALUE) {
    addErrorClass(evt.target);
  } else {
    removeErrorClass(evt.target);
  }

  evt.target.reportValidity();
});

const checkRooms = (rooms, capacity) => {
  const capacityOptions = capacity.options;

  [...capacityOptions].forEach((option) => {
    if (!RoomsOptions[rooms.value].includes(option.value)) {
      option.setAttribute('disabled', '');
    } else {
      option.removeAttribute('disabled', '');
    }
  });

  if (!RoomsOptions[rooms.value].includes(capacity.value)) {
    addErrorClass(capacity);
  } else {
    removeErrorClass(capacity);
  }

  capacity.reportValidity();
};

const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');

roomNumberSelect.addEventListener('change', () => {
  checkRooms(roomNumberSelect, capacitySelect);
});

capacitySelect.addEventListener('change', () => {
  checkRooms(roomNumberSelect, capacitySelect);
});

const formButtonSubmit = document.querySelector('.ad-form__submit');

formButtonSubmit.addEventListener('click', (evt) => {
  const form = document.querySelector('.ad-form');
  const isValidForm = form.checkValidity();

  checkRooms(roomNumberSelect, capacitySelect);

  if (!isValidForm) {
    evt.preventDefault();
  }
});

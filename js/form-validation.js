const ERROR_CLASS = 'is-error';
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


const form = document.querySelector('.ad-form');

const isValidField = (input) => input.validity.valid;

const isErrorField = (input) => {
  const parent = input.parentElement;

  if (isValidField(input)) {
    parent.classList.remove(ERROR_CLASS);
  } else {
    parent.classList.add(ERROR_CLASS);
  }
};

const checkTitle = (input) => {
  const valueLength = input.value.length;

  if (valueLength < TitleLength.MIN) {
    input.setCustomValidity(`Ещё ${TitleLength.MIN - valueLength} симв.`);
  } else if (valueLength > TitleLength.MAX) {
    input.setCustomValidity(`Удалите лишние ${valueLength - TitleLength.MAX} симв.`);
  } else {
    input.setCustomValidity('');
  }

  isErrorField(input);
  input.reportValidity();
};

const titleInput = form.querySelector('#title');
titleInput.addEventListener('input', () => {
  checkTitle(titleInput);
});

const checkPrice = (input) => {
  const vlaue = +input.value;

  if (vlaue > MAX_PRICE_VALUE) {
    input.setCustomValidity(`Цена не может быть больше ${MAX_PRICE_VALUE}`);
  } else {
    input.setCustomValidity('');
  }

  isErrorField(input);
  input.reportValidity();
};

const priceInput = form.querySelector('#price');
priceInput.addEventListener('input', () => {
  checkPrice(priceInput);
});

const checkRooms = (rooms, capacity) => {

  [...capacity.options].forEach((option) => {
    if (!RoomsOptions[rooms.value].includes(option.value)) {
      option.setAttribute('disabled', '');
    } else {
      option.removeAttribute('disabled', '');
    }
  });

  if (!RoomsOptions[rooms.value].includes(capacity.value)) {
    capacity.setCustomValidity('Выберите подходящее число гостей');
  } else {
    capacity.setCustomValidity('');
  }

  isErrorField(capacity);
  capacity.reportValidity();
  return isValidField(capacity);
};

const roomNumberSelect = form.querySelector('#room_number');
const capacitySelect = form.querySelector('#capacity');
roomNumberSelect.addEventListener('change', () => {
  checkRooms(roomNumberSelect, capacitySelect);
});

capacitySelect.addEventListener('change', () => {
  checkRooms(roomNumberSelect, capacitySelect);
});

form.addEventListener('submit', (evt) => {
  let valid = true;

  checkRooms(roomNumberSelect, capacitySelect);

  if (!checkRooms(roomNumberSelect, capacitySelect)) {
    valid = false;
  }

  if (!valid) {
    evt.preventDefault();
  }
});

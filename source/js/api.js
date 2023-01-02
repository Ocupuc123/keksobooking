import { showAlert } from './util.js';

const URL = 'https://23.javascript.pages.academy/keksobooking';

const getData = (cb) => {
  fetch(`${URL}/data`)
    .then((response) => response.json())
    .then((data) => cb(data))
    .catch(() => {
      showAlert('Ошибка загрузки данных');
    });
};

const sendData = async (onSuccess, onFail, body) => {
  fetch(URL, {
    method: 'POST',
    body,
  }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    }
  }).catch(onFail);
};

export {sendData, getData};

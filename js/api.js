import { showAlert } from './util.js';

const getOffers = async () => {

  try {
    const response = await fetch('https://23.javascript.pages.academy/keksobooking/data');
    const offers = await response.json();
    return offers;
  } catch (error) {
    showAlert('Ошибка загрузки данных');
    return [];
  }

};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch('https://23.javascript.pages.academy/keksobooking', {
      method: 'POST',
      body,
    });

    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    }
  } catch (error) {
    onFail('Не удалось отправить форму. Попробуйте ещё раз');
  }
};

export {sendData, getOffers};

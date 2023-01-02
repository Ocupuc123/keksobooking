const ALERT_SHOW_TIME = 5000;
const getRandomInt = (min = 1, max = 5) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFraction = (min = 1.101, max = 1.203, count = 2) => Number((Math.random() * (max - min) + min).toFixed(count));
const getRandomArrayElement = (element) => element[getRandomInt(0, element.length - 1)];
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showMessage = (name) => {
  const messageTemplate = document.querySelector(`#${name}`).content.querySelector(`.${name}`);
  const messageElement = messageTemplate.cloneNode(true);
  messageElement.style.zIndex = 1000;
  document.body.append(messageElement);

  const documentEscKeydownHandler = (evt) => {
    if (isEscEvent(evt)) {
      messageElement.remove();
      document.removeEventListener('keydown', documentEscKeydownHandler);
    }
  };

  document.addEventListener('keydown', documentEscKeydownHandler);

  document.addEventListener('click', () => {
    messageElement.remove();
  });

};

export { showMessage, showAlert, getRandomInt, getRandomFraction, getRandomArrayElement };

const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderSimilarOffer = ({ author, offer }) => {
  const offerElement = similarOfferTemplate.cloneNode(true);

  const getType = (type) => {
    switch (type) {
      case 'palace':
        return 'Дворец';
      case 'house':
        return 'Дом';
      case 'bungalow':
        return 'Бунгало';
      case 'flat':
        return 'Квартира';
      case 'hotel':
        return 'Отель';
      default:
        throw new Error(`Неизвестный тип жилья ${type}`);
    }
  };

  try {
    offerElement.querySelector('.popup__type').textContent = getType(offer.type);
  } catch (error) {
    offerElement.querySelector('.popup__type').textContent = `${error.message}`;
  }

  offerElement.querySelector('.popup__avatar').src = author.avatar;
  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.address;
  offerElement.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  offerElement.querySelector('.popup__text--capacity').innerHTML = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').innerHTML = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if (offer.features) {
    offerElement.querySelector('.popup__features').innerHTML = offer.features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`).join('');
  } else {
    offerElement.querySelector('.popup__features').remove();
  }
  if (offer.description) {
    offerElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    offerElement.querySelector('.popup__description').remove();
  }
  if (offer.photos) {
    offerElement.querySelector('.popup__photos').innerHTML = offer.photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья" />`).join('');
  } else {
    offerElement.querySelector('.popup__photos').remove();
  }

  return offerElement;
};

export { renderSimilarOffer };

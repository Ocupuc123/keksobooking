const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderSimilarOffer = (({ author, offer}) => {
  const offerElement = similarOfferTemplate.cloneNode(true);

  switch (offer.type) {
    case 'palace':
      offerElement.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'house':
      offerElement.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'bungalow':
      offerElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'flat':
      offerElement.querySelector('.popup__type').textContent = 'Квартира';
      break;
  }

  offerElement.querySelector('.popup__avatar').src = author.avatar;
  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.address;
  offerElement.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  offerElement.querySelector('.popup__text--capacity').innerHTML = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').innerHTML = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  offerElement.querySelector('.popup__features').innerHTML = offer.features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`).join('');
  offerElement.querySelector('.popup__description').textContent = offer.description;
  offerElement.querySelector('.popup__photos').innerHTML = offer.photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья" />`).join('');
  return offerElement;
});

export { renderSimilarOffer };

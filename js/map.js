import { getData } from './api.js';
import { renderSimilarOffer } from './similar-offer.js';
import { showAlert } from './util.js';

/* global L:readonly */
const MAX_SIMILAR_OFFER_COUNT = 10;
const ZOOM = 13;
const TokyoCoordinates = {
  latitude: 35.68283,
  longitude: 139.75945
};
const adForm = document.querySelector('.ad-form');
const addressInput = adForm.querySelector('#address');
const { latitude, longitude } = TokyoCoordinates;
const position = [latitude, longitude];

let isLoadMap = false;

const map = L.map('map-canvas', {
  scrollWheelZoom: false
});

map.on('load', () => {
  isLoadMap = true;

  getData(
    (offers) => {
      offers.slice(0, MAX_SIMILAR_OFFER_COUNT).forEach((offer) => {

        const icon = L.icon({
          iconUrl: '../leaflet/img/pin.svg',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        });

        const marker = L.marker([offer.location.lat, offer.location.lng], {
          icon: icon
        });

        marker
          .addTo(map)
          .bindPopup(renderSimilarOffer(offer));
      });
    },
    () => showAlert('При загрузке данных возникла ошибка')
  );
});

map.setView(position, ZOOM);

const mainPinIcon = L.icon({
  iconUrl: '../leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [25, 52],
});

const mainPinMarker = L.marker(position, {
  icon: mainPinIcon,
  draggable: true
});

mainPinMarker.addTo(map);

addressInput.setAttribute('value', `${position}`);

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  addressInput.setAttribute('value', `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
});

const setDefaultMarkerPosition = () => {
  mainPinMarker.setLatLng(position);
  addressInput.setAttribute('value', `${position}`);
};

L.tileLayer(
  'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'}
).addTo(map);

export { isLoadMap, setDefaultMarkerPosition };

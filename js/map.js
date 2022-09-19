import { createOffers } from './data.js';
import { renderSimilarOffer } from './similar-offer.js';

/* global L:readonly */
const TOKYO_LAT = 35.68283;
const TOKYO_LNG = 139.75945;
const ZOOM = 13;
const latlng = L.latLng(TOKYO_LAT, TOKYO_LNG);
const adForm = document.querySelector('.ad-form');
const addressInput = adForm.querySelector('#address');
let isLoadMap = false;

const map = L.map('map-canvas', {
  scrollWheelZoom: false
}).on('load', () => {
  isLoadMap = true;
}).setView(latlng, ZOOM);


const mainPinIcon = L.icon({
  iconUrl: '../leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [25, 52],
});

const mainPinMarker = L.marker(latlng, {
  icon: mainPinIcon,
  draggable: true
});

mainPinMarker.addTo(map);

addressInput.value = `${TOKYO_LAT}, ${TOKYO_LNG}`;

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

L.tileLayer(
  'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'}
).addTo(map);

const similarOffers = createOffers();

similarOffers.forEach((offer) => {
  const icon = L.icon({
    iconUrl: '../leaflet/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker([offer.location.x, offer.location.y], {
    icon: icon
  });

  marker
    .addTo(map)
    .bindPopup(renderSimilarOffer(offer));
});

export {isLoadMap};

/* global L:readonly */

import { renderSimilarOffer } from './similar-offer.js';
import { getData } from './api.js';
import { initForm, initFilter } from './form.js';
import { setMapFilterFormListener } from './filter.js';
import { showAlert } from './util.js';

const ZOOM = 13;
const SIMILAR_OFFER_COUNT = 10;
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';
const TILE = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

const TokyoCoordinates = {
  LATITUDE: 35.68283,
  LONGITUDE: 139.75945
};

const mapCanvas = document.querySelector('#map-canvas');
const adForm = document.querySelector('.ad-form');
const addressInput = adForm.querySelector('#address');
const mainPinMarkerPosition = [TokyoCoordinates.LATITUDE, TokyoCoordinates.LONGITUDE];

const map = L.map(mapCanvas, {
  scrollWheelZoom: false
}).setView(mainPinMarkerPosition, ZOOM);

L.tileLayer(
  TILE,
  { attribution: ATTRIBUTION}
).addTo(map);

const mainPinMarker = L.marker(mainPinMarkerPosition, {
  icon: L.icon({
    iconUrl: './vendors/leaflet/images/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [25, 52],
  }),
  draggable: true
});

const mainPinMarkerMoveHandler = (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const setDefaultAddress = () => {
  addressInput.value = `${mainPinMarkerPosition}`;
};

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (offer) => {
  const { location } = offer;
  const marker = L.marker([location.lat, location.lng], {
    icon: L.icon({
      iconUrl: '../vendors/leaflet/images/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    })
  });
  marker
    .addTo(markerGroup)
    .bindPopup(renderSimilarOffer(offer));
};

const clearMarkers = () => {
  markerGroup.clearLayers();
};

const renderMarkers = (offers) => offers.forEach((offer)=> createMarker(offer));

const rerenderMarkers = (offers) => {
  clearMarkers();
  renderMarkers(offers);
};

const setDefaultMarkerPosition = () => {
  mainPinMarker.setLatLng(mainPinMarkerPosition);
  addressInput.value = `${mainPinMarkerPosition}`;
  map.setView(mainPinMarkerPosition, ZOOM);
};

const onDataLoad = (offer) => {
  renderMarkers(offer.slice(0, SIMILAR_OFFER_COUNT));
  initFilter();
  setMapFilterFormListener(offer);
};

const onDataFail = () => {
  showAlert('Ошибка загрузки данных');
};

const getMap = () => {
  map.whenReady(() => {
    initForm();
    getData(onDataLoad, onDataFail);
  });

  setDefaultAddress();
  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', mainPinMarkerMoveHandler);
};

export { getMap, rerenderMarkers, setDefaultMarkerPosition};

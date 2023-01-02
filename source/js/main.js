import './form-validation.js';
import { getMap, setDefaultMarkerPosition, } from './map.js';
import { showMessage } from './util.js';
import { setFormSubmit, setFormReset, formReset, inactiveStatePage } from './form.js';
import { rangeSlider } from './nouislider.js';
import { uploadAvatar, uploadHousingPreview } from './upload-preview.js';
import './upload-preview.js';

inactiveStatePage();
getMap();
rangeSlider();
setFormSubmit(
  () => {
    formReset();
    setDefaultMarkerPosition();
    showMessage('success');
  },
  () => {
    showMessage('error');
  });
setFormReset(
  () => {
    formReset();
    setDefaultMarkerPosition();
  }
);
uploadAvatar();
uploadHousingPreview();

import { isLoadMap, setDefaultMarkerPosition } from './map.js';
import { showMessage } from './util.js';
import { formSubmitHandler, formResetButtonHandler, inactiveStatePage, formReset } from './form.js';

if (!isLoadMap) {
  inactiveStatePage();
}

formSubmitHandler(
  () => {
    formReset();
    setDefaultMarkerPosition();
    showMessage('success');
  },
  () => {
    showMessage('error');
  });
formResetButtonHandler(
  () => {
    formReset();
    setDefaultMarkerPosition();
  }
);

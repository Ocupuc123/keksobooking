import { isLoadMap, setDefaultMarkerPosition } from './map.js';
import { showMessage } from './util.js';
import { formSubmitHandler, formResetButtonHandler, inactiveStatePage, formReset } from './form.js';

if (!isLoadMap) {
  inactiveStatePage();
}

const onReset = () => {
  formReset();
  setDefaultMarkerPosition();
};

const onSuccess = () => {
  onReset();
  showMessage('success');
};

const onFail = () => {
  showMessage('error');
};

formSubmitHandler(onSuccess, onFail);
formResetButtonHandler(onReset);

import { Alert } from 'react-native';
import { Toast } from 'native-base';

import * as Logger from '../common/logger';

import { getStore } from '../store';

import { $processing, $done } from './Activity.state';

/**
 * Processing
 */

export function processing(module = 'App', operation = 'default') {
  getStore().dispatch($processing(`${module}.${operation}`));
}

export function done(module = 'App', operation = 'default') {
  getStore().dispatch($done(`${module}.${operation}`));
}

/**
 * Notification and Alerts
 */

const NOTIFICATION_TYPE = {
  success: 'success',
  failure: 'danger',
  warning: 'warning',
  info: '',
  default: '',
};


function mapNotificationType(type) {
  return NOTIFICATION_TYPE[type] || NOTIFICATION_TYPE.default;
}

export function toast(type, title) {
  Logger.debug('toast', type, title);

  Toast.show({
    type: mapNotificationType(type),
    text: title,
    position: 'bottom',
    buttonText: 'Ok',
  });
}

export function status(type, message) {
  Logger.debug('toast', type, message);

  Toast.show({
    type: mapNotificationType(type),
    text: message,
    position: 'bottom',
    buttonText: 'Ok',
  });
}

export function alert(title, message, neutralButton, cancelButton, confirmButton) {
  Logger.debug('alert', title, message);

  Alert.alert(
    title,
    message,
    [neutralButton, cancelButton, confirmButton],
  );
}

export function confirm(title, message, cancelButton, confirmButton) {
  Logger.debug('confirm', title, message);

  Alert.alert(
    title,
    message,
    [cancelButton, confirmButton],
    { cancelable: false },
  );
}

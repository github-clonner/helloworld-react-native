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

export function toast(type, content) {
  type = NOTIFICATION_TYPE[type] || NOTIFICATION_TYPE.default;

  Logger.debug('toast', type, content);

  Toast.show({
    type,
    text: content,
    position: 'bottom',
    buttonText: 'Ok',
  });
}

export function status(type, message) {
  type = NOTIFICATION_TYPE[type] || NOTIFICATION_TYPE.default;

  Logger.debug('toast', type, message);

  Toast.show({
    type,
    text: message,
    position: 'bottom',
    buttonText: 'Ok',
  });
}

export function alert(type, title, content) {
  // @TODO
}

export function confirm(title, content, options = {}) {
  // @TODO
}

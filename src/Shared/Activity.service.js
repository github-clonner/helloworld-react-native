import { Toast } from 'native-base';

import { getStore } from '../store';

import { $processing, $done } from './Activity.state';

export function processing(module = 'App', operation = 'default') {
  getStore().dispatch($processing(`${module}.${operation}`));
}

export function done(module = 'App', operation = 'default') {
  getStore().dispatch($done(`${module}.${operation}`));
}

export function toast(type, title, content = '') {}

export function status(type, label) {}

export function alert(type, title, content) {}

export function confirm(title, content, options = {}) {}


/**
 * Message
 */

/*
const message = StateHelper.createSimpleOperation('message');

const Activity_message = 'Activity_message';

export function $message(message, { notify = false } = {}) {
  return (dispatch) => {
    Logger.debug('$message', message);

    return message.action({ operation });

    dispatch({
      type: Activity_message,
      message,
    });

    if (notify) {
      Toast.show({
        text: message,
        position: 'bottom',
        buttonText: 'Ok',
      });
    }
  };
}
*/

/**
 * Notification
 */

/*
const NOTIFICATION_TYPE = {
  success: 'success',
  failure: 'danger',
  warning: 'warning',
  info: '',
  default: '',
};

const status = StateHelper.createSimpleOperation('status');

const Activity_status = 'Activity_status';

export function $status(type, label) {
  type = NOTIFICATION_TYPE[type] || NOTIFICATION_TYPE.default;

  Logger.debug('$status', type, label);

  Toast.show({
    type,
    text: label,
    position: 'bottom',
    buttonText: 'Ok',
  });

  return {
    type: Activity_status,
    params: {
      type,
      label,
    },
  };
}
*/

/**
 * Toast
 */

/*
const toast = StateHelper.createSimpleOperation('toast');

const Activity_toast = 'Activity_toast';

export function $toast(type, title, content = '') {
  type = NOTIFICATION_TYPE[type] || NOTIFICATION_TYPE.default;

  Logger.debug('$toast', type, title, content);

  Toast.show({
    type,
    text: title,
    position: 'bottom',
    buttonText: 'Ok',
  });

  return {
    type: Activity_toast,
    params: {
      type,
      title,
      content,
    },
  };
}
*/

/**
 * Alerts
 */

/*
const alert = StateHelper.createSimpleOperation('alert');

const Activity_alert = 'Activity_alert';

export function $alert(type, title, content) {
  Logger.debug('$alert', title, content);

  // Alert.alert(({
  //   title,
  //   content,
  // });

  return {
    type: Activity_alert,
    params: {
      title,
      content,
    },
  };
}

const CONFIRM_TYPE = {
  default: 'primary',
  critical: 'danger',
};

let alertReference;

const confirm = StateHelper.createSimpleOperation('confirm');

const Activity_confirm = 'Activity_confirm';

export function $confirm(title, content, options = {}) {
  options.actionType = CONFIRM_TYPE[options.actionType] || CONFIRM_TYPE.default;
  options.actionLabel = options.actionLabel || 'Confirm';

  Logger.debug('$confim', title, content, options);

  return (dispatch) => {
    dispatch({
      type: Activity_confirm,
      params: {
        title,
        content,
      },
    });

    if (alertReference) {
      alertReference.destroy();
    }

    return new Promise((resolve, reject) => {
      // alertReference = Modal.confirm({
      //   title,
      //   content,
      //   okType: options.actionType,
      //   okText: options.actionLabel,
      //   onOk() {
      //     alertReference = null;
      //     resolve(true);
      //   },
      //   onCancel() {
      //     alertReference = null;
      //     resolve(false);
      //   },
      // });
    });
  };
}
*/

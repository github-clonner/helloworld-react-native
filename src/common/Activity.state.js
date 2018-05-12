import { Toast } from 'native-base';

import * as Logger from './logger';

export const NAME = 'Activity';

/**
 * Activity Indicator
 */

const ACTIVITY_PROCESSING = 'ACTIVITY_PROCESSING';

export function $processing(topic = 'default', { message = 'Loading ...' } = {}) {
  Logger.debug('$processing', topic, message);

  return {
    type: ACTIVITY_PROCESSING,
    topic,
  };
}

const ACTIVITY_DONE = 'ACTIVITY_DONE';

export function $done(topic = 'default') {
  Logger.debug('$done', topic);

  return {
    type: ACTIVITY_DONE,
    topic,
  };
}

/**
 * Message
 */

const ACTIVITY_MESSAGE = 'ACTIVITY_MESSAGE';

export function $message(message, { notify = false } = {}) {
  return (dispatch) => {
    Logger.debug('$message', message);

    dispatch({
      type: ACTIVITY_MESSAGE,
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

/**
 * Notification
 */

const NOTIFICATION_TYPE = {
  success: 'success',
  failure: 'danger',
  warning: 'warning',
  info: '',
  default: '',
};

const ACTIVITY_STATUS = 'ACTIVITY_STATUS';

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
    type: ACTIVITY_STATUS,
    params: {
      type,
      label,
    },
  };
}

const ACTIVITY_TOAST = 'ACTIVITY_TOAST';

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
    type: ACTIVITY_TOAST,
    params: {
      type,
      title,
      content,
    },
  };
}

/**
 * Alerts
 */

const ACTIVITY_ALERT = 'ACTIVITY_ALERT';

export function $alert(type, title, content) {
  Logger.debug('$alert', title, content);

  // Alert.alert(({
  //   title,
  //   content,
  // });

  return {
    type: ACTIVITY_ALERT,
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

const ACTIVITY_CONFIRM = 'ACTIVITY_CONFIRM';

export function $confirm(title, content, options = {}) {
  options.actionType = CONFIRM_TYPE[options.actionType] || CONFIRM_TYPE.default;
  options.actionLabel = options.actionLabel || 'Confirm';

  Logger.debug('$confim', title, content, options);

  return (dispatch) => {
    dispatch({
      type: ACTIVITY_CONFIRM,
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

/**
 * Reducer
 */

export function reducer(
  state = {
    processing: false,
    processingByTopic: {
      default: false,
    },
    message: null,
  },
  action,
) {
  switch (action.type) {
    case ACTIVITY_PROCESSING:
      return {
        ...state,
        processing: true,
        processingByTopic: {
          ...state.processingByTopic,
          [action.topic]: true,
        },
      };
    case ACTIVITY_DONE:
      return {
        ...state,
        processing: false,
        // processing: Object.values(state.processingByTopic).reduce((acc, v) => acc && v, false),
        processingByTopic: {
          ...state.processingByTopic,
          [action.topic]: false,
        },
      };
    case ACTIVITY_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
}

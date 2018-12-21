import * as Logger from '../common/logger';

import { AUTH_LOGOUT } from '../Auth/state';

export const MODULE = 'Shared';

/**
 * Initial State
 */

const INITIAL_STATE = () => ({
  ready: false,
  initialized: false,
});

/**
 * Ready app
 */

const SHARED_READY = 'SHARED_READY';

export function $ready() {
  Logger.debug('$ready');

  return {
    type: SHARED_READY,
  };
}

/**
 * Initialize app
 */

const SHARED_INITIALIZED = 'SHARED_INITIALIZED';

export function $initialize() {
  Logger.debug('$initialize');

  return async (dispatch) => {
    await Promise.all([
      new Promise((resolve) => setTimeout(resolve, 2000)),
      // dispatch($loadSomething()),
    ]);

    dispatch({
      type: SHARED_INITIALIZED,
    });
  };
}

/**
 * Reducer
 */

export function reducer(state = INITIAL_STATE(), action) {
  switch (action.type) {
    case SHARED_READY:
      return {
        ...state,
        ready: true,
      };
    case SHARED_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        initialized: false,
      };
    default:
      return state;
  }
}

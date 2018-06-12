import * as Logger from '../common/logger';

import { AUTH_LOGOUT } from '../Auth/state';

export const NAME = 'Shared';

const SHARED_READY = 'SHARED_READY';

export function $ready() {
  Logger.debug('$ready');

  return {
    type: SHARED_READY,
  };
}

const SHARED_INITIALIZED = 'SHARED_INITIALIZED';

export function $initialize() {
  Logger.debug('$initialize');

  return async (dispatch) => {
    // await Promise.all([
    //   dispatch($loadSomething()),
    // ]);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    dispatch({
      type: SHARED_INITIALIZED,
    });
  };
}

export function reducer(
  state = {
    ready: false,
    initialized: false,
  },
  action,
) {
  switch (action.type) {
    case SHARED_READY:
      return {
        ...state,
        ready: true,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        initialized: false,
      };
    case SHARED_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
}

export async function initializer() {
  // ...
}

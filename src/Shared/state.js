import * as Logger from '../common/logger';

import * as StateHelper from '../common/state.helper';

import * as Session from '../Session/state';

/**
 * Module name
 */

export const MODULE = 'Shared';

/**
 * Initial state
 */

const defineInitialState = () => ({
  appReady: false,
  sessionReady: false,
});

/**
 * Ready app
 */

export const $appReady = StateHelper.createSimpleOperation(MODULE, 'appReady', () => {
  return async (dispatch) => {
    await Promise.all([
      new Promise((resolve) => setTimeout(resolve, 1000)),
      // dispatch($loadSomething()),
    ]);

    return dispatch($appReady.action());
  };
});

/**
 * Prepare session
 */

export const $prepareSession = StateHelper.createSimpleOperation(MODULE, 'prepareSession', () => {
  return async (dispatch) => {
    await Promise.all([
      new Promise((resolve) => setTimeout(resolve, 2000)),
      // dispatch($loadSomething()),
    ]);

    return dispatch($prepareSession.action());
  };
});

/**
 * Clear session
 */

export const $clearSession = StateHelper.createSimpleOperation(MODULE, 'clearSession', () => {
  return async (dispatch) => {
    dispatch(Session.$reset());

    // dispatch($reset()),

    return dispatch($clearSession.action());
  };
});

/**
 * Reducer
 */

export function reducer(state = defineInitialState(), action) {
  switch (action.type) {
    case $appReady.ACTION:
      return {
        ...state,
        appReady: true,
      };
    case $prepareSession.ACTION:
      return {
        ...state,
        sessionReady: true,
      };
    case $clearSession.ACTION:
      return {
        ...state,
        sessionReady: false,
      };
    default:
      return state;
  }
}

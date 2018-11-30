import { API_ENDPOINT } from '../common/config';

import * as FetchHelper from '../common/fetch.helper';
import * as StateHelper from '../common/state.helper';

import { AuthService } from '../Auth/Auth.service';

import { AUTH_LOGOUT } from '../Auth/state';

import * as Activity from '../Shared/Activity.state';

export const MODULE = 'Home';

/**
 * Initial State
 */

const INITIAL_STATE = {
  index: null,
};

/**
 * Reset
 */

const HOME_RESET = 'HOME_RESET';

export function $reset() {
  return {
    type: HOME_RESET,
  };
}

/**
 * Fetch Index
 */

const fetchIndex = StateHelper.createAsyncOperation(MODULE, 'fetchIndex');

// Promise implementation
export function $fetchTaskIndexPromise() {
  return (dispatch) => {
    dispatch(Activity.$processing(MODULE, $fetchTaskIndexPromise.name));
    dispatch(fetchIndex.request());

    return fetch(`${API_ENDPOINT}/task`, {
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch(fetchIndex.success({ index: result.data })))
      .catch((error) => dispatch(fetchIndex.failure(error)))
      .finally(() => dispatch(Activity.$done(MODULE, $fetchTaskIndexPromise.name)));
  };
}

// async/await implementation
export function $fetchTaskIndex() {
  return async (dispatch) => {
    dispatch(Activity.$processing(MODULE, $fetchTaskIndex.name));
    dispatch(fetchIndex.request());

    try {
      const response = await fetch(`${API_ENDPOINT}/task`, {
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
      });
      const result = await FetchHelper.ResponseHandler(response);

      return dispatch(fetchIndex.success({ index: result.data }));
    } catch (error) {
      await FetchHelper.ErrorValueHandler(error);
      dispatch(fetchIndex.failure(error));
    } finally {
      dispatch(Activity.$done(MODULE, $fetchTaskIndex.name));
    }
  };
}

/**
 * Reducer
 */

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HOME_RESET:
    case AUTH_LOGOUT:
      return INITIAL_STATE;
    case fetchIndex.REQUEST:
      return {
        ...state,
        index: null,
      };
    case fetchIndex.SUCCESS:
      return {
        ...state,
        index: action.index,
      };
    case fetchIndex.FAILURE:
      return {
        ...state,
        index: null,
      };
    default:
      return state;
  }
}

/**
 * Persister
 */

export function persister({ index }) {
  return {
    index,
  };
}

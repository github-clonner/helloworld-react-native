import { API_ENDPOINT } from '../common/config';

import * as FetchHelper from '../common/fetch.helper';
import * as StateHelper from '../common/state.helper';

import { AuthService } from '../Auth/Auth.service';

import * as Activity from '../Shared/Activity.service';

/**
 * Module Name
 */

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

const reset = StateHelper.createSimpleOperation(MODULE, 'reset');

export const $reset = reset.action;

/**
 * Fetch Index
 */

const fetchIndex = StateHelper.createAsyncOperation(MODULE, 'fetchIndex');
const createTask = StateHelper.createAsyncOperation(MODULE, 'createTask');

// Promise implementation
export function $fetchIndexPromise() {
  return (dispatch) => {
    Activity.processing(MODULE, fetchIndex.name);
    dispatch(fetchIndex.request());

    return fetch(`${API_ENDPOINT}/client/my-tasks`, {
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch(fetchIndex.success(result)))
      .catch((error) => dispatch(fetchIndex.failure(error)))
      .finally(() => Activity.done(MODULE, fetchIndex.name));
  };
}

// async/await implementation
export function $fetchIndex() {
  return async (dispatch) => {
    Activity.processing(MODULE, fetchIndex.name);
    dispatch(fetchIndex.request());

    try {
      const response = await fetch(`${API_ENDPOINT}/task`, {
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
      });
      const result = await FetchHelper.ResponseHandler(response);

      return dispatch(fetchIndex.success(result));
    } catch (error) {
      await FetchHelper.ErrorValueHandler(error);
      dispatch(fetchIndex.failure(error));
    } finally {
      Activity.done(MODULE, fetchIndex.name);
    }
  };
}

export function $createTask(text) {
  return async (dispatch) => {
    Activity.processing(MODULE, createTask.name);
    dispatch(createTask.request());

    try {
      const response = await fetch(`${API_ENDPOINT}/task/create`, {
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
        body: JSON.stringify(text),
      });
      const result = await FetchHelper.ResponseHandler(response);

      return dispatch(createTask.success(result));
    } catch (error) {
      await FetchHelper.ErrorValueHandler(error);
      dispatch(createTask.failure(error));
    } finally {
      Activity.done(MODULE, createTask.name);
    }
  };
}

/**
 * Reducer
 */

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case reset.TYPE:
      return INITIAL_STATE;
    case fetchIndex.REQUEST:
      return {
        ...state,
        index: null,
      };
    case fetchIndex.SUCCESS:
      return {
        ...state,
        index: action.data,
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

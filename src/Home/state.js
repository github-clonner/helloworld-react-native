// import { CORE_AUTH_ENDPOINT } from '../common/config';

import * as FetchHelper from '../common/fetch.helper';
import * as StateHelper from '../common/state.helper';
import * as Activity from '../Shared/Activity.state';

export const NAME = 'Home';

/**
 * Fetch Data
 */

/* Fetch Data - Action types and internal action creators */

const HOME_DATA_REQUEST = 'HOME_DATA_REQUEST';

const fetchDataRequest = StateHelper.createRequestAction(HOME_DATA_REQUEST);

const HOME_DATA_SUCCESS = 'HOME_DATA_SUCCESS';

// Success action creator, must dispatch success and return value to pass to view layer via exposed action creator
const fetchDataSuccess = StateHelper.createSuccessAction(HOME_DATA_SUCCESS);

// // Success action creator simplest implementation
// function fetchDataSuccess({ data }) {
//   return {
//     type: HOME_DATA_SUCCESS,
//     data,
//   };
// }

// // Success action creator with fine tuning for view data
// function fetchDataSuccess({ data }) {
//   return (dispatch) => {
//     dispatch({
//       type: HOME_DATA_SUCCESS,
//       data,
//     });
//
//     return {
//       accounts: {
//         totalCount: data.accounts.length,
//         enabled: data.accounts.filter(r => r.enabled)
//         disabled: data.accounts.filter(r => !r.enabled)
//       },
//     };
//   };
// }

const HOME_DATA_FAILURE = 'HOME_DATA_FAILURE';

// Failure action creator must dispatch failure and throw an error
const fetchDataFailure = StateHelper.createFailureAction(HOME_DATA_FAILURE);

/* Fetch Data - Exposed action creators, must return a promise */

// Promise implementation
function $fetchDataPromise() {
  return (dispatch) => {
    dispatch(Activity.$processing());
    dispatch(fetchDataRequest());

    return fetch('https://httpbin.org/ip')
      .then(FetchHelper.processResponse, FetchHelper.processError)
      .then((result) => dispatch(fetchDataSuccess({ data: result })))
      .catch((error) => dispatch(fetchDataFailure(error)))
      .finally(() => dispatch(Activity.$done()));
  };
}

// async/await implementation
function $fetchDataAsyncAwait() {
  return async (dispatch) => {
    dispatch(Activity.$processing());
    dispatch(fetchDataRequest());

    try {
      const response = await fetch('https://httpbin.org/ip');
      const result = await FetchHelper.processResponse(response);

      return dispatch(fetchDataSuccess({ data: result }));
    } catch (error) {
      await FetchHelper.processError(error).catch((error) => dispatch(fetchDataFailure(error)));
    } finally {
      dispatch(Activity.$done());
    }
  };
}

export const $fetchData = $fetchDataAsyncAwait;

/**
 * Reducer
 */

export function reducer(
  state = {
    data: null,
  },
  action,
) {
  switch (action.type) {
    case HOME_DATA_REQUEST:
      return {
        ...state,
        data: null,
      };
    case HOME_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case HOME_DATA_FAILURE:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
}

/**
 * Persister
 */

export function persister({ data }) {
  return {
    data,
  };
}

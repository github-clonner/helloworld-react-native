import * as Logger from '../common/logger';
import * as StateHelper from '../common/state.helper';
import * as FetchHelper from '../common/fetch.helper';

import * as Activity from '../Shared/Activity.state';
import { $ready, $initialize } from '../Shared/state';

import { AuthService } from './Auth.service';

export const MODULE = 'Auth';

/**
 * Initial State
 */

const INITIAL_STATE = {
  authenticated: false,
  user: null,
};

/**
 * Log in
 */

const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';

function loginRequest() {
  return {
    type: AUTH_LOGIN_REQUEST,
  };
}

export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';

function loginSuccess({ user, ...rest }) {
  return (dispatch) => {
    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      user,
      ...rest,
    });

    return { user };
  };
}

const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';

function loginFailure(error) {
  return (dispatch) => {
    dispatch({
      type: AUTH_LOGIN_FAILURE,
    });

    dispatch(Activity.$message(error.message));

    throw error;
  };
}

export function $login(username, password) {
  return (dispatch) => {
    dispatch(Activity.$processing(MODULE, $login.name, { message: 'Logging in ...' }));
    dispatch(loginRequest());

    return AuthService.login(username, password)
      .then((result) => dispatch(loginSuccess(result)))
      .then((result) => dispatch($initialize()).then(() => result))
      .catch((error) => dispatch(loginFailure(error)))
      .finally(() => dispatch(Activity.$done(MODULE, $login.name)));
  };
}

/**
 * Logout
 */

export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export function $logout() {
  return (dispatch) => {
    return AuthService.logout().then(() => dispatch({
      type: AUTH_LOGOUT,
    }));
  };
}

/**
 * Sign up
 */

const AUTH_SIGNUP_REQUEST = 'AUTH_SIGNUP_REQUEST';

function signupRequest() {
  return {
    type: AUTH_SIGNUP_REQUEST,
  };
}

const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS';

function signupSuccess({ user, ...rest }) {
  return (dispatch) => {
    dispatch({
      type: AUTH_SIGNUP_SUCCESS,
      user,
      ...rest,
    });

    return { user };
  };
}

const AUTH_SIGNUP_FAILURE = 'AUTH_SIGNUP_FAILURE';

function signupFailure(error) {
  return (dispatch) => {
    dispatch({
      type: AUTH_SIGNUP_FAILURE,
    });

    dispatch(Activity.$message(error.message));

    throw error;
  };
}

export function $signup(payload) {
  return (dispatch) => {
    dispatch(Activity.$processing(MODULE, $signup.name, { message: 'Singing up ...' }));
    dispatch(signupRequest());

    return AuthService.signup(payload)
      .then((result) => dispatch(signupSuccess(result)))
      .then((result) => dispatch($initialize()).then(() => result))
      .catch((error) => dispatch(signupFailure(error)))
      .finally(() => dispatch(Activity.$done(MODULE, $signup.name)));
  };
}

/**
 * Password Reset
 */

const AUTH_INITIATE_PASSWORD_RESET_REQUEST = 'AUTH_INITIATE_PASSWORD_RESET_REQUEST';

function initiatePasswordResetRequest() {
  return {
    type: AUTH_INITIATE_PASSWORD_RESET_REQUEST,
  };
}

const AUTH_INITIATE_PASSWORD_RESET_SUCCESS = 'AUTH_INITIATE_PASSWORD_RESET_SUCCESS';

function initiatePasswordResetSuccess({ ...rest }) {
  return (dispatch) => {
    dispatch({
      type: AUTH_INITIATE_PASSWORD_RESET_SUCCESS,
      ...rest,
    });

    return { ...rest };
  };
}

const AUTH_INITIATE_PASSWORD_RESET_FAILURE = 'AUTH_INITIATE_PASSWORD_RESET_FAILURE';

function initiatePasswordResetFailure(error) {
  return (dispatch) => {
    dispatch({
      type: AUTH_INITIATE_PASSWORD_RESET_FAILURE,
    });

    dispatch(Activity.$message(error.message));

    throw error;
  };
}

export function $initiatePasswordReset(email) {
  return (dispatch) => {
    dispatch(Activity.$processing(MODULE, $initiatePasswordReset.name, { message: 'Singing up ...' }));
    dispatch(initiatePasswordResetRequest());

    return AuthService.initiatePasswordReset(email)
      .then((result) => dispatch(initiatePasswordResetSuccess(result)))
      .catch((error) => dispatch(initiatePasswordResetFailure(error)))
      .finally(() => dispatch(Activity.$done(MODULE, $initiatePasswordReset.name)));
  };
}

/**
 * Reducer
 */

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        user: null,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: action.user,
      };
    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: action.user,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

export function persister({ authenticated, user }) {
  return {
    authenticated,
    user,
  };
}

export async function initializer({ dispatch, getState }) {
  FetchHelper.events.on('failure', (error, response) => {
    if (AuthService.isAuthenticated() && response.status === 401) {
      dispatch($login(AuthService.username, AuthService.password)).catch((error) => {
        dispatch(Activity.$toast('failure', error.message));
        dispatch($logout());
      });
    }
  });

  await AuthService.initialize();

  if (AuthService.isAuthenticated()) {
    await dispatch($initialize()).catch((error) => dispatch(Activity.$toast('failure', error.message)));
  } else if (AuthService.hasCredentials()) {
    dispatch($login(AuthService.username, AuthService.password)).catch((error) => {
      dispatch(Activity.$toast('failure', error.message));
      dispatch($logout());
    });
  } else if (getState().Auth.authenticated) {
    dispatch({
      type: AUTH_LOGOUT,
    });
  }

  dispatch($ready());
}

/**
 * App bootstrap
 */

import { getStore } from './store';

import * as FetchHelper from './common/fetch.helper';

import { AuthService } from './Auth/Auth.service';

import * as Auth from './Auth/state';

import * as Shared from './Shared/state';

import * as Dialog from './Shared/Dialog';

export default async function bootstrap() {
  const { dispatch, getState } = getStore();

  FetchHelper.events.on('failure', (error, response) => {
    if (AuthService.isAuthenticated() && response.status === 401) {
      dispatch(Auth.$logout());
    }
  });

  AuthService.events.on('login', () => {
    dispatch(Shared.$prepareSession()).catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
  });

  AuthService.events.on('logout', () => {
    dispatch(Shared.$clearSession());
  });

  await AuthService.initialize();

  if (!AuthService.isAuthenticated() && getState().Auth.authenticated) {
    dispatch(Auth.$reset());
  }

  await dispatch(Shared.$appReady());

  if (AuthService.isAuthenticated()) {
    await dispatch(Shared.$prepareSession()).catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
  }
}

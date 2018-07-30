import * as Keychain from 'react-native-keychain';
import { AsyncStorage } from 'react-native';

import { EventEmitter } from '../common/events';

import { API_ENDPOINT } from '../common/config';
import * as FetchHelper from '../common/fetch.helper';

import { createLogger } from '../common/logger';

const Logger = createLogger('AuthService');

export const AuthServiceImplementation = class AuthService {
  events = new EventEmitter();

  username = '';

  password = '';

  token = null;

  async _loadSession() {
    this.token = (await AsyncStorage.getItem('auth.token')) || null;
  }

  async _saveSession(token) {
    this.token = token || null;
    await AsyncStorage.setItem('auth.token', this.token);
  }

  async _clearSession() {
    this.token = null;
    await AsyncStorage.removeItem('auth.token');
  }

  async _loadCredentials() {
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      this.username = credentials.username;
      this.password = credentials.password;
    }
  }

  async _saveCredentials(username, password) {
    await Keychain.setGenericPassword(username, password);
  }

  async _clearCredentials() {
    this.username = '';
    this.password = '';

    await Keychain.resetGenericPassword();
  }

  async initialize() {
    await this._loadSession();
    await this._loadCredentials();
  }

  hasCredentials() {
    return !!this.username && !!this.password;
  }

  isAuthenticated() {
    return !!this.token;
  }

  login(username, password) {
    return fetch(`${API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then(async ({ token, ...result }) => {
        await this._saveSession(token);
        await this._saveCredentials(username, password);
        await this.events.emitAsync('login');
        return result;
      });
  }

  async logout() {
    await this.events.emitAsync('logout');
    await this._clearSession();
    await this._clearCredentials();
  }

  signup(payload) {
    const { name, email, password } = payload;

    const user = { name, email, password };

    return fetch(`${API_ENDPOINT}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
      }),
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then(({ token, ...result }) => {
        this._saveSession(token);
        this._saveCredentials(user.email, user.password);
        return result;
      });
  }

  initiateAccountRecovery(email) {
    return fetch(`${API_ENDPOINT}/auth/recovery/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    }).then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler);
  }
};

export const AuthService = new AuthServiceImplementation();

if (process.env.NODE_ENV === 'development') {
  global.AuthService = AuthService;
}

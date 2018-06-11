import * as Keychain from 'react-native-keychain';
import { AsyncStorage } from 'react-native';

import { EventEmitter } from '../lib/events';

import { API_ENDPOINT } from '../common/config';
import * as FetchHelper from '../common/fetch.helper';

export class AuthService {
  static token = null;

  static username = '';
  static password = '';

  static events = new EventEmitter();

  static async _loadSession() {
    this.token = await AsyncStorage.getItem('auth.token');
  }

  static async _saveSession(token) {
    this.token = token;
    await AsyncStorage.setItem('auth.token', token);
  }

  static async _clearSession() {
    this.token = null;
    await AsyncStorage.removeItem('auth.token');
  }

  static async _loadCredentials() {
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      this.username = credentials.username;
      this.password = credentials.password;
    }
  }

  static async _saveCredentials(username, password) {
    await Keychain.setGenericPassword(username, password);
  }

  static async _clearCredentials() {
    this.username = '';
    this.password = '';

    await Keychain.resetGenericPassword();
  }

  static async initialize() {
    await this._loadSession();
    await this._loadCredentials();
  }

  static hasCredentials() {
    return !!this.username && !!this.password;
  }

  static isAuthenticated() {
    return !!this.token;
  }

  static login(username, password) {
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
      .then(FetchHelper.processResponse, FetchHelper.processError)
      .then(({ token, ...result }) => {
        this._saveSession(token);
        this._saveCredentials(username, password);
        this.events.emit('login');
        return result;
      });
  }

  static loginWithCredentials() {
    return this.login(this.username, this.password);
  }

  static async logout() {
    this.events.emit('logout');
    await this._clearSession();
    await this._clearCredentials();
  }

  static signup(payload) {
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
      .then(FetchHelper.processResponse, FetchHelper.processError)
      .then(({ token, ...result }) => {
        this._saveSession(token);
        this._saveCredentials(user.email, user.password);
        return result;
      });
  }

  static initiateAccountRecovery(email) {
    return fetch(`${API_ENDPOINT}/auth/recovery/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    }).then(FetchHelper.processResponse, FetchHelper.processError);
  }
}

if (process.env.NODE_ENV === 'development') {
  global.AuthService = AuthService;
}

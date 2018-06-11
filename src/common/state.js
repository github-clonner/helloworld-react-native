import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import persistState, { mergePersistedState } from 'redux-localstorage';
import persistAdapter from 'redux-localstorage/lib/adapters/AsyncStorage';
import { AsyncStorage } from 'react-native';

import $state from './state.definition';

/**
 * define root reducer
 */

// let reducer = combineReducers({
//   Activity: $state.Activity.reducer,
//   Auth: $state.Auth.reducer,
//   // ...
// });

let reducer = combineReducers(Object.entries($state).reduce((result, [name, substate]) => {
  return substate.reducer
    ? {
      ...result,
      [name]: substate.reducer,
    }
    : result;
}, {}));

/**
 * support loading persisted partial initial state
 */

reducer = compose(mergePersistedState())(reducer);

/**
 * define persistence
 */

// const persistSelector = (state) => ({
//   Auth: $state.Auth.persister(state.Auth),
//   // ...
// });

const persistSelector = (state) =>
  Object.entries($state).reduce((result, [name, substate]) => {
    return substate.persister
      ? {
        ...result,
        [name]: substate.persister(state[name]),
      }
      : result;
  }, {});

const persistStorage = compose((storage) => {
  storage._put = storage.put;
  storage.put = function (key, state, callback) {
    storage._put(key, persistSelector(state), callback);
  };
  return storage;
})(persistAdapter(AsyncStorage));

const persistEnhancer = persistState(persistStorage, 'redux');

/**
 * define enhancers
 */

const enhancerMiddleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  enhancerMiddleware.push(createLogger());
}

const composeEnhancers =
  global && global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(...enhancerMiddleware), persistEnhancer);

/**
 * define store creation an initialization
 */

let $store;

export function setupStore() {
  $store = createStore(reducer, enhancer);

  Object.values($state).forEach(async (state) => {
    if (state.initializer) {
      await state.initializer($store);
    }
  });

  if (process.env.NODE_ENV === 'development') {
    global.$store = $store;
    global.$state = $state;
  }

  return $store;
}

/**
 * define enhancers
 */

export function getStore() {
  return $store;
}

/**
 * Check state definition in development mode
 */

if (process.env.NODE_ENV === 'development') {
  Object.entries($state).forEach(([name, state]) => {
    if (!state) {
      console.warn(`$state.${name}: invalid descriptor`);
    }
    if (!state.NAME || state.NAME !== name) {
      console.warn(`$state.${name}: missing or invalid 'NAME'`);
    }
    if (!state.reducer || typeof state.reducer !== 'function') {
      console.warn(`$state.${name}: missing or invalid 'reducer'`);
    }
    if (state.persister && typeof state.persister === 'function') {
      console.info(`$state.${name}: found 'persister'`);
    }
    if (state.initializer && typeof state.initializer === 'function') {
      console.info(`$state.${name}: found 'initializer'`);
    }
  });
}

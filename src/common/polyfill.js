// @IMPORTANT prefer Babel transform when possible

import promiseFinallyImplementation from 'promise.prototype.finally/implementation';

/**
 * process.nextTick
 */

if (!process.nextTick) {
  process.nextTick = setImmediate;
}

/**
 * Promise.prototype.finally
 * this is necessary for React Native to fix incorrect implementation
 */

if (typeof Promise.prototype.finally !== 'function' || Promise.prototype.finally.toString().includes('onSettled')) {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Promise.prototype, 'finally', {
    configurable: true,
    writable: true,
    value: promiseFinallyImplementation,
  });
}

/**
 * Intl
 */

if (!process.nextTick) {
  process.nextTick = setImmediate;
}

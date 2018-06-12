import { EventEmitter } from 'events';

export * from 'events';

export class AsyncEventEmitter extends EventEmitter {
  emit(event, ...args) {
    return this.listeners(event)
      .reduce((prev, listener) => {
        return prev.then(() => Promise.resolve(listener(...args)));
      }, Promise.resolve(null))
      .catch((error) => {
        throw error;
      });
  }
}

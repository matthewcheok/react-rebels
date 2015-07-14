import Dispatcher from './Dispatcher';
import {
  EventEmitter
}
from 'events';

const CHANGE_EVENT = 'CHANGE_EVENT';

export default class BaseStore extends EventEmitter {
	static get defaultStore() {
		return new this();
	}

  constructor() {
    super();
    this._handlers = new Map();

    let self = this;
    this.dispatcherIndex = Dispatcher.register(function(action) {
      let callback = self._handlers.get(action.type);
      let payload = action.payload;

      if (callback) {
        callback(payload);
      }
    });
  }

  // Store -> Action
  dispatchAction(type, payload) {
    Dispatcher.dispatch({
      type: type,
      payload: payload
    });
  }

  // Store -> Component
  addChangeListener(callback) {
    this.addListener(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT, this);
  }

  // Action -> Store
  listenForAction(type, callback) {
    this._handlers.set(type, callback);
  }
}

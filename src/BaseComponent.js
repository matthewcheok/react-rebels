import Dispatcher from './Dispatcher';
import React, {
  Component
}
from 'react';

export default class BaseComponent extends Component {
  constructor() {
    super();
    this._updates = new Map();
  }

  // Component -> Action
  dispatchAction(type, payload) {
		Dispatcher.dispatch({
			type: type,
			payload: payload
		});
  }

  // Store -> Component
  updateFromStore(store, callback) {
    this._updates.set(store, callback);
    store.addChangeListener(this._onChange.bind(this));
  }

  componentWillMount() {
  	// initial update
  	this._onChange();
  }

  componentWillUnmount() {
    for (let [store, callback] of this._updates.entries()) {
      store.removeChangeListener(this._onChange);
    }
  }

  _onChange() {
    for (let [store, callback] of this._updates.entries()) {
      let update = callback.call(this, store);
      if (update) {
        this.setState(update);
      }
    }
  }
}

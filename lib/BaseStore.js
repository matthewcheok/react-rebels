'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Dispatcher = require('./Dispatcher');

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

var _events = require('events');

var CHANGE_EVENT = 'CHANGE_EVENT';

var BaseStore = (function (_EventEmitter) {
  _inherits(BaseStore, _EventEmitter);

  _createClass(BaseStore, null, [{
    key: 'defaultStore',
    get: function get() {
      return new this();
    }
  }]);

  function BaseStore() {
    _classCallCheck(this, BaseStore);

    _get(Object.getPrototypeOf(BaseStore.prototype), 'constructor', this).call(this);
    this._handlers = new Map();

    var self = this;
    this.dispatcherIndex = _Dispatcher2['default'].register(function (action) {
      var callback = self._handlers.get(action.type);
      var payload = action.payload;

      if (callback) {
        callback(payload);
      }
    });
  }

  _createClass(BaseStore, [{
    key: 'dispatchAction',

    // Store -> Action
    value: function dispatchAction(type, payload) {
      _Dispatcher2['default'].dispatch({
        type: type,
        payload: payload
      });
    }
  }, {
    key: 'addChangeListener',

    // Store -> Component
    value: function addChangeListener(callback) {
      this.addListener(CHANGE_EVENT, callback);
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  }, {
    key: 'emitChange',
    value: function emitChange() {
      this.emit(CHANGE_EVENT, this);
    }
  }, {
    key: 'listenForAction',

    // Action -> Store
    value: function listenForAction(type, callback) {
      this._handlers.set(type, callback);
    }
  }]);

  return BaseStore;
})(_events.EventEmitter);

exports['default'] = BaseStore;
module.exports = exports['default'];
'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _history = require('history');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log(Object.keys(reactRR))
// *** Load store reducers ***
// import topicListPage from './reducers/topic-list-reducer'

// The initial state from server-generated HTML
// have a look to server code.
// *** Load react and react-dom ***
var initialState = window.__INITIAL_STATE__ || {};

// // https://github.com/rackt/history/blob/master/docs/GettingStarted.md
// const history = createHistory()

// https://github.com/reactjs/react-router-redux
var middleware = (0, _reactRouterRedux.routerMiddleware)(_reactRouter.browserHistory);

// // Create Redux store with initial state
// // const store = createStore(counterApp, initialState)

// const finalCreateStore = compose(
//   applyMiddleware(middleware)
//   // DevTools.instrument()
//   //
// )(createStore)
// const store = finalCreateStore(reducer, window.__INITIAL_STATE__)

function loginReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? { loginStatus: null } : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'LOGIN_ERROR_BAD_EMAIL':
      return { loginStatus: 'EMAIL_NO_VALID' };
    case 'LOGIN_ERROR_PASSWORD_EMAIL':
      return { loginStatus: 'PASSWORD_NO_VALID' };
    default:
      return state;
  }
}

var store = (0, _redux.createStore)((0, _redux.combineReducers)({
  loginReducer: loginReducer,
  routing: _reactRouterRedux.routerReducer
}), initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(middleware)));
// Create an enhanced history that syncs navigation events with the store
var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

console.log(store.getState());
// Connection example: "wss://localhost:8008"
var ws = new WebSocket('wss://' + location.host);
// Facade object to use websocket

var WebSocketSimple = function () {
  function WebSocketSimple(initialWebsocket) {
    (0, _classCallCheck3.default)(this, WebSocketSimple);

    this.ws = initialWebsocket;
    // console.log('Initiated ')
  }

  (0, _createClass3.default)(WebSocketSimple, [{
    key: 'send',
    value: function send(data) {
      var message = void 0;
      if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object') {
        message = (0, _stringify2.default)(event.data);
      }
      this.ws.send(message);
    }
  }]);
  return WebSocketSimple;
}();

var websocket = new WebSocketSimple(ws);

// Llegan mensajes del servidor:
ws.onmessage = function (event) {
  // Check the query.
  // Process action.
  var message = void 0;
  console.log('>>>' + event.data);
  if (/^\{.*\}$/.test(event.data)) {
    message = JSON.parse(event.data);
  } else {
    console.log(event.data);
    return;
  }
  console.log('>>>' + (0, _stringify2.default)(event.data));

  switch (message.type) {
    // Process message of type MUTATE
    case 'MUTATE':
      mutate({
        action: message.action,
        payload: message.payload,
        ws: ws,
        store: store
      });
      break;
    // Process message of type QUERY
    case 'QUERY':
      console.log(message.type + ' ' + message.payload.email || '');
      break;
    // Process message of type ACTIONS
    default:
      // dispatch 'ACTIONS'
      console.log(message.type + ' ' + message.payload || '');
      store.dispatch({ type: message.action, payload: message.payload });
  }
};

setTimeout(function () {
  return websocket.send((0, _stringify2.default)({ type: 'MUTATE', action: 'LOGIN_ACCOUNT', payload: { email: 'me@me.me', password: 'algo' } }));
}, 2000);

// setTimeout( () => store.dispatch(push('/modules/example')), 3000)

var HiperApp = function (_React$Component) {
  (0, _inherits3.default)(HiperApp, _React$Component);

  function HiperApp() {
    (0, _classCallCheck3.default)(this, HiperApp);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(HiperApp).apply(this, arguments));
  }

  (0, _createClass3.default)(HiperApp, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { websocket: websocket };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'hiperApp' },
        this.props.children
      );
    }
  }]);
  return HiperApp;
}(_react2.default.Component);

HiperApp.childContextTypes = {
  websocket: _react2.default.PropTypes.object
};

(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    HiperApp,
    null,
    (0, _routes2.default)(history)
  )
), document.getElementById('app'));
//# sourceMappingURL=jaakko-client.js.map

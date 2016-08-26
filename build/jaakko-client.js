'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _websocketSimple = require('./websocket-message/websocket-simple');

var _websocketSimple2 = _interopRequireDefault(_websocketSimple);

var _clientReducers = require('./reducers/client-reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The initial state from server-generated HTML
// have a look to server code.
// *** Load react and react-dom ***
var initialState = window.__INITIAL_STATE__ || {};

// // https://github.com/rackt/history/blob/master/docs/GettingStarted.md
// const history = createHistory()

// https://github.com/reactjs/react-router-redux


// console.log(Object.keys(reactRR))
// *** Load store reducers ***
var middleware = (0, _reactRouterRedux.routerMiddleware)(_reactRouter.browserHistory);

// // Create Redux store with initial state
var store = (0, _redux.createStore)((0, _redux.combineReducers)({
  account: _clientReducers.account,
  routing: _reactRouterRedux.routerReducer
}), initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(middleware),
// Redux devToolsExtension
window.devToolsExtension ? window.devToolsExtension() : function (f) {
  return f;
}));
// Create an enhanced history that syncs navigation events with the store
var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

console.log(store.getState());
// Connection example: "wss://localhost:8008"
var ws = new WebSocket('wss://' + location.host);
// var websocket used to send data.
var websocket = new _websocketSimple2.default(ws);

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
        websocket: websocket,
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

// Simulate a login...
// setTimeout( () => websocket.send( { type: 'MUTATE', action: 'LOGIN_ACCOUNT', payload: {email:'me@me.me', password: 'algo'} } ), 2000)
// setTimeout( () => websocket.send( { type: 'MUTATE', action: 'LOGIN_ACCOUNT', payload: {email:'felixdrp@gmail.com', password: '1234'} } ), 1000)

// Move the client to a web page...
// setTimeout( () => store.dispatch(push('/modules/example')), 3000)

// Class to pass the websocket with context to the rest of components.

var HiperApp = function (_React$Component) {
  (0, _inherits3.default)(HiperApp, _React$Component);

  function HiperApp() {
    (0, _classCallCheck3.default)(this, HiperApp);
    return (0, _possibleConstructorReturn3.default)(this, (HiperApp.__proto__ || (0, _getPrototypeOf2.default)(HiperApp)).apply(this, arguments));
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

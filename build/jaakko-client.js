'use strict';

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
var store = (0, _redux.createStore)((0, _redux.combineReducers)({
  // topicListPage,
  routing: _reactRouterRedux.routerReducer
}), initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(middleware)));
// Create an enhanced history that syncs navigation events with the store
var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

console.log(store.getState());

// setTimeout( () => store.dispatch(push('/modules/example')), 3000)

(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  (0, _routes2.default)(history)
), document.getElementById('app'));
//# sourceMappingURL=jaakko-client.js.map

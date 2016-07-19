'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _components = require('./components/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Assign the history:
var routes = function routes(history) {
  return _react2.default.createElement(
    _reactRouter.Router,
    { history: history },
    _react2.default.createElement(
      _reactRouter.Route,
      { path: '/', component: _components.AppContainer },
      _react2.default.createElement(_reactRouter.IndexRoute, { component: _components.CommonViewContainer }),
      _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/account/signin' }),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: 'account', component: _components.CommonViewContainer },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _components.AccountSignIn }),
        _react2.default.createElement(_reactRouter.Route, { path: 'signin', component: _components.AccountSignIn }),
        _react2.default.createElement(_reactRouter.Route, { path: 'signup', component: _components.AccountSignUp })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: 'sync', component: _components.CommonViewContainer },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _components.Syncronize })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: 'example', component: _components.CommonViewContainer },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _components.Example })
      )
    )
  );
};

/**
 * React-router components.
 *
 * React router help to render component related to the path or url.
 *
 * Please have a look to:
 * https://github.com/reactjs/react-router
 *
 */

// Please add new core components to /components/index.js

exports.default = routes;
//# sourceMappingURL=routes.js.map

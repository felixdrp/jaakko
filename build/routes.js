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

// ALERT!!!! if any change in survye routes... change also 'survey-types.js'
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
        { path: 'controlRoom', component: _components.ControlRoom },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _components.GroupManager }),
        _react2.default.createElement(_reactRouter.Route, { path: 'groups', component: _components.GroupManager }),
        _react2.default.createElement(_reactRouter.Route, { path: 'sessionControl', component: _components.SessionManager }),
        _react2.default.createElement(_reactRouter.Route, { path: 'results', component: _components.ResultsManager })
      ),
      _react2.default.createElement(
        _reactRouter.Route,
        { path: 'survey', component: _components.SurveyContainer },
        _react2.default.createElement(_reactRouter.Route, { path: 'waitSync', component: _components.Wait }),
        _react2.default.createElement(_reactRouter.Route, { path: 'example', component: _components.Example }),
        _react2.default.createElement(_reactRouter.Route, { path: 'question', component: _components.Question }),
        _react2.default.createElement(_reactRouter.Route, { path: 'mathChallenge', component: _components.MathChallenge }),
        _react2.default.createElement(_reactRouter.Route, { path: 'altObjectTask', component: _components.AltObjectTask }),
        _react2.default.createElement(_reactRouter.Route, { path: 'instructions', component: _components.Instructions }),
        _react2.default.createElement(_reactRouter.Route, { path: 'similarities', component: _components.Similarities }),
        _react2.default.createElement(_reactRouter.Route, { path: 'favourites', component: _components.Favourites }),
        _react2.default.createElement(_reactRouter.Route, { path: 'results', component: _components.Results }),
        _react2.default.createElement(_reactRouter.Route, { path: 'mathResults', component: _components.MathResults })
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

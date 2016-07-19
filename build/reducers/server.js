'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = todos;
exports.account = account;

var _server = require('../actions/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = [{
  text: 'Use Redux',
  completed: false,
  id: 0
}];

function todos() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _server.REGISTER_ACCOUNT:
      return [{
        id: state.reduce(function (maxId, todo) {
          return Math.max(todo.id, maxId);
        }, -1) + 1,
        completed: false,
        text: action.text
      }].concat((0, _toConsumableArray3.default)(state));

    default:
      return state;
  }
}

/*
 * reducers
 */

function account() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _server.REGISTER_ACCOUNT:
      return action.register;
    case LOGIN_ACCOUNT:
      return action.filter;
    default:
      return state;
  }
}
//# sourceMappingURL=server.js.map

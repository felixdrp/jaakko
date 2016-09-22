'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.account = account;
exports.task = task;

var _clientActions = require('../actions/client-actions');

var _serverActions = require('../websocket-message/server-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function account() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? { registerStatus: {}, loginStatus: {} } : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _clientActions.ACCOUNT_REGISTER_ERROR:
      return { registerStatus: action.payload };
    case _clientActions.ACCOUNT_LOGIN_ERROR:
      return { loginStatus: action.payload };
    case _clientActions.ACCOUNT_LOG_USER:
      if ('token' in action.payload) document.cookie = 'token=' + action.payload.token;
      return (0, _extends3.default)({}, state, action.payload);
    default:
      return state;
  }
}

function task() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? { tasks: [] } : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _serverActions.TASK_UPDATE_GROUP_IDEAS:
      state.tasks = action.payload;
      return state;

    default:
      return state;
  }
}
//# sourceMappingURL=client-reducers.js.map

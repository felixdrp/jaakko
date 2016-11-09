'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.accounts = accounts;
exports.groups = groups;
exports.session = session;
exports.results = results;
exports.task = task;

var _actions = require('../actions/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


function accounts() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { list: [] };
  var action = arguments[1];

  var payload = action.payload || '';
  switch (action.type) {
    case _actions.ACCOUNTS_ADD:
      if (state[payload.email]) {
        state[payload.email] = (0, _extends3.default)({}, payload, {
          group: state[payload.email].group,
          surveyPointer: state[payload.email].surveyPointer - 1
        });
        return state;
      }
      state.list.push(payload.email);
      state[payload.email] = payload;
      return state;
    case _actions.ACCOUNTS_UPDATE:
      if (state[payload.email]) {
        state[payload.email] = payload;
        return state;
      }
      return state;
    case _actions.ACCOUNTS_REMOVE:
      if (state[payload.email]) {
        state.list.splice(state.list.indexOf(payload.email), 1);
        delete state[payload.email];
        return state;
      }
      return state;
    default:
      return state;
  }
}

function groups() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { list: [] };
  var action = arguments[1];

  var payload = action.payload || '';

  switch (action.type) {
    case _actions.GROUPS_ADD:
      if (state[payload.groupId]) {
        return state;
      }
      state.list.push(payload.groupId);
      state[payload.groupId] = {
        accountList: payload.list || [],
        type: payload.type || 0
      };
      return state;
    case _actions.GROUPS_REMOVE:
      if (state[payload.groupId]) {
        state.list.splice(state.list.indexOf(payload.groupId), 1);
        delete state[payload.groupId];
        return state;
      }
      return state;
    case _actions.GROUPS_ADD_ACCOUNT:
      if (state[payload.groupId].accountList.indexOf(payload.account) !== -1) {
        return state;
      }
      state[payload.groupId].accountList.push(payload.account);
      return state;
    case _actions.GROUPS_REMOVE_ACCOUNT:
      if (state[payload.groupId].accountList.includes(payload.account)) {
        state[payload.groupId].accountList.splice(state[payload.groupId].accountList.indexOf(payload.account), 1);
      }
      return state;
    default:
      return state;
  }
}

function session() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  var payload = action.payload || '';
  switch (action.type) {
    case _actions.SESSION_DATA_ADD:
      state = payload;
      return state;

    default:
      return state;
  }
}

function results() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { surveyInfo: [] };
  var action = arguments[1];

  var payload = action.payload || '';
  switch (action.type) {
    case _actions.STORE_SURVEY_INFO:
      state.surveyInfo.push(payload);
      return state;

    default:
      return state;
  }
}

function task() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    taskPointer: 0,
    taskList: [[]],
    similarList: [[]],
    favouritList: [[]]
  };
  var action = arguments[1];

  var payload = action.payload || '';
  var temp = void 0;
  switch (action.type) {
    case _actions.TASK_ADD_IDEA:
      state.taskList[state.taskPointer].push(payload);
      return state;

    case _actions.TASK_ADD_ALL_SIMILARITIES:
      temp = (0, _extends3.default)({}, state);
      temp.similarList[state.taskPointer] = payload;
      return temp;

    case _actions.TASK_ADD_ALL_FAVOURITES:
      temp = (0, _extends3.default)({}, state);
      temp.favouritList[state.taskPointer] = payload;
      return temp;

    case _actions.TASK_INCREASE_POINTER:
      temp = (0, _extends3.default)({}, state, { taskPointer: state.taskPointer + 1 });
      temp.taskList.push([]);
      temp.similarList.push([]);
      temp.favouritList.push([]);
      return temp;
    default:
      return state;
  }
}
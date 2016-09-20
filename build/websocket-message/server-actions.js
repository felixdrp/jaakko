'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOGIN_ACCOUNT = exports.REGISTER_ACCOUNT = exports.ACTION = exports.QUERY = exports.MUTATE = undefined;
exports.registerAccount = registerAccount;
exports.loginAccount = loginAccount;
exports.wsLogAccount = wsLogAccount;
exports.wsGotoPage = wsGotoPage;
exports.wsGroupAdd = wsGroupAdd;
exports.wsGroupRemove = wsGroupRemove;
exports.wsAssignSelectedAccountsToGroup = wsAssignSelectedAccountsToGroup;
exports.wsUnassignSelectedAccounts = wsUnassignSelectedAccounts;
exports.wsUnassignAccount = wsUnassignAccount;
exports.wsAutomateGroupsCreation = wsAutomateGroupsCreation;
exports.swUpdateControlRoom = swUpdateControlRoom;
exports.wsSurveyStepAll = wsSurveyStepAll;

var _reactRouterRedux = require('react-router-redux');

var _clientActions = require('../actions/client-actions');

var _actions = require('../actions/actions');

var _queryActions = require('./query-actions');

// Server socket actions
// Socket action types:

// Send the user to a new page
var MUTATE = exports.MUTATE = 'MUTATE';

// Redux client actions
var QUERY = exports.QUERY = 'QUERY';
var ACTION = exports.ACTION = 'ACTION';

// Register a new account in the db and add to the account list
var REGISTER_ACCOUNT = exports.REGISTER_ACCOUNT = 'REGISTER_ACCOUNT';
// Register using socket action creator
function registerAccount(_ref) {
  var firstName = _ref.firstName;
  var surename = _ref.surename;
  var email = _ref.email;
  var password = _ref.password;
  var reEnterPassword = _ref.reEnterPassword;

  return {
    type: MUTATE,
    action: REGISTER_ACCOUNT,
    payload: {
      firstName: firstName,
      surename: surename,
      email: email,
      password: password,
      reEnterPassword: reEnterPassword
    }
  };
}

// Check the account and add to the account list
var LOGIN_ACCOUNT = exports.LOGIN_ACCOUNT = 'LOGIN_ACCOUNT';
// Register using socket action creator
function loginAccount(_ref2) {
  var email = _ref2.email;
  var password = _ref2.password;

  return {
    type: MUTATE,
    action: LOGIN_ACCOUNT,
    payload: {
      email: email,
      password: password
    }
  };
}

// Log the account in the client redux store
function wsLogAccount(_ref3) {
  var email = _ref3.email;
  var firstName = _ref3.firstName;
  var surename = _ref3.surename;
  var token = _ref3.token;

  return {
    type: ACTION,
    action: _clientActions.ACCOUNT_LOG_USER,
    payload: {
      email: email,
      firstName: firstName,
      surename: surename,
      token: token
    }
  };
}

// Goto page
function wsGotoPage(_ref4) {
  var url = _ref4.url;
  var _ref4$options = _ref4.options;
  var options = _ref4$options === undefined ? {} : _ref4$options;

  var routerAction = (0, _reactRouterRedux.push)(url);
  return {
    type: ACTION,
    action: routerAction.type,
    payload: routerAction.payload
  };
}

// Register a group socket action creator
function wsGroupAdd(obj) {
  var name = obj && 'name' in obj ? obj.name : '';
  return {
    type: MUTATE,
    action: _actions.GROUPS_ADD,
    payload: {
      name: name
    }
  };
}

// Remove a group socket action creator
function wsGroupRemove(groupId) {
  return {
    type: MUTATE,
    action: _actions.GROUPS_REMOVE,
    payload: {
      groupId: groupId
    }
  };
}

// Register selected accounts to a group socket action creator
function wsAssignSelectedAccountsToGroup(groupId) {
  var selected = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  return {
    type: MUTATE,
    action: _actions.GROUPS_SELECTED_ACCOUNTS_TO_GROUP,
    payload: {
      groupId: groupId,
      selected: selected
    }
  };
}

function wsUnassignSelectedAccounts() {
  var selected = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  return {
    type: MUTATE,
    action: _actions.GROUPS_SELECTED_ACCOUNTS_UNASSIGN,
    payload: {
      selected: selected
    }
  };
}

function wsUnassignAccount(accountId) {
  return {
    type: MUTATE,
    action: _actions.GROUPS_ACCOUNTS_UNASSIGN,
    payload: {
      accountId: accountId
    }
  };
}

function wsAutomateGroupsCreation(numberOfGroups) {
  return {
    type: MUTATE,
    action: _actions.GROUPS_AUTOMATE_CREATION,
    payload: {
      numberOfGroups: numberOfGroups
    }
  };
}

// update state in components ControlRoom socket action creator
function swUpdateControlRoom(state) {
  return {
    type: ACTION,
    action: _queryActions.SESSION_STATE_GET,
    payload: state
  };
}

// update state in components ControlRoom socket action creator
function wsSurveyStepAll(accountList) {
  return {
    type: MUTATE,
    action: _actions.SURVEY_STEP_ALL,
    payload: accountList
  };
}
//# sourceMappingURL=server-actions.js.map

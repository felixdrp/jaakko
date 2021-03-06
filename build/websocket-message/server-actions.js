'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_SURVEY_INITIALS = exports.TASK_UPDATE_GROUP_IDEAS = exports.TASK_IDEA_ADD = exports.LOGIN_ACCOUNT = exports.REGISTER_ACCOUNT = exports.ACTION = exports.QUERY = exports.MUTATE = undefined;
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
exports.wsSubmitSurveyInfo = wsSubmitSurveyInfo;
exports.swTaskIdeaAdd = swTaskIdeaAdd;
exports.wsTaskUpdateGroupIdeas = wsTaskUpdateGroupIdeas;
exports.swSetSurveyInitials = swSetSurveyInitials;

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
  var firstName = _ref.firstName,
      surname = _ref.surname,
      email = _ref.email,
      password = _ref.password,
      reEnterPassword = _ref.reEnterPassword;

  return {
    type: MUTATE,
    action: REGISTER_ACCOUNT,
    payload: {
      firstName: firstName,
      surname: surname,
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
  var email = _ref2.email,
      password = _ref2.password;

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
  var email = _ref3.email,
      firstName = _ref3.firstName,
      surname = _ref3.surname,
      token = _ref3.token;

  return {
    type: ACTION,
    action: _clientActions.ACCOUNT_LOG_USER,
    payload: {
      email: email,
      firstName: firstName,
      surname: surname,
      token: token
    }
  };
}

// Goto page
function wsGotoPage(_ref4) {
  var url = _ref4.url,
      _ref4$options = _ref4.options,
      options = _ref4$options === undefined ? {} : _ref4$options;

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
  var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

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
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

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

// update redux state with info from survey
function wsSubmitSurveyInfo(info) {
  return {
    type: MUTATE,
    action: _actions.SUBMIT_SURVEY_INFO,
    payload: info
  };
}

// Add ideas to de redux
var TASK_IDEA_ADD = exports.TASK_IDEA_ADD = 'TASK_IDEA_ADD';

function swTaskIdeaAdd(idea) {
  return {
    type: MUTATE,
    action: TASK_IDEA_ADD,
    payload: idea
  };
}

// Share idea with the group
var TASK_UPDATE_GROUP_IDEAS = exports.TASK_UPDATE_GROUP_IDEAS = 'TASK_UPDATE_GROUP_IDEAS';

function wsTaskUpdateGroupIdeas(bunchIdeas) {
  return {
    type: ACTION,
    action: TASK_UPDATE_GROUP_IDEAS,
    payload: bunchIdeas
  };
}

// Share idea with the group
var SET_SURVEY_INITIALS = exports.SET_SURVEY_INITIALS = 'SET_SURVEY_INITIALS';

function swSetSurveyInitials(payload) {
  return {
    type: ACTION,
    action: SET_SURVEY_INITIALS,
    payload: payload
  };
}
//# sourceMappingURL=server-actions.js.map

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


var MUTATE = exports.MUTATE = 'MUTATE';

var QUERY = exports.QUERY = 'QUERY';
var ACTION = exports.ACTION = 'ACTION';

var REGISTER_ACCOUNT = exports.REGISTER_ACCOUNT = 'REGISTER_ACCOUNT';
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

var LOGIN_ACCOUNT = exports.LOGIN_ACCOUNT = 'LOGIN_ACCOUNT';
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

function wsGroupRemove(groupId) {
  return {
    type: MUTATE,
    action: _actions.GROUPS_REMOVE,
    payload: {
      groupId: groupId
    }
  };
}

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

function swUpdateControlRoom(state) {
  return {
    type: ACTION,
    action: _queryActions.SESSION_STATE_GET,
    payload: state
  };
}

function wsSurveyStepAll(accountList) {
  return {
    type: MUTATE,
    action: _actions.SURVEY_STEP_ALL,
    payload: accountList
  };
}

function wsSubmitSurveyInfo(info) {
  return {
    type: MUTATE,
    action: _actions.SUBMIT_SURVEY_INFO,
    payload: info
  };
}

var TASK_IDEA_ADD = exports.TASK_IDEA_ADD = 'TASK_IDEA_ADD';

function swTaskIdeaAdd(idea) {
  return {
    type: MUTATE,
    action: TASK_IDEA_ADD,
    payload: idea
  };
}

var TASK_UPDATE_GROUP_IDEAS = exports.TASK_UPDATE_GROUP_IDEAS = 'TASK_UPDATE_GROUP_IDEAS';

function wsTaskUpdateGroupIdeas(bunchIdeas) {
  return {
    type: ACTION,
    action: TASK_UPDATE_GROUP_IDEAS,
    payload: bunchIdeas
  };
}

var SET_SURVEY_INITIALS = exports.SET_SURVEY_INITIALS = 'SET_SURVEY_INITIALS';

function swSetSurveyInitials(payload) {
  return {
    type: ACTION,
    action: SET_SURVEY_INITIALS,
    payload: payload
  };
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTINUE = exports.WAIT = exports.TASK_INCREASE_POINTER = exports.TASK_ADD_ALL_FAVOURITES = exports.TASK_ADD_ALL_SIMILARITIES = exports.TASK_ADD_IDEA = exports.STORE_SURVEY_INFO = exports.SUBMIT_SURVEY_INFO = exports.SURVEY_STEP_ALL = exports.SESSION_DATA_ADD = exports.SEND_ACCOUNT_MESSAGE = exports.SEND_GROUP_MESSAGE = exports.SEND_ALL_MESSAGE = exports.GROUPS_AUTOMATE_CREATION = exports.GROUPS_ACCOUNTS_UNASSIGN = exports.GROUPS_SELECTED_ACCOUNTS_UNASSIGN = exports.GROUPS_SELECTED_ACCOUNTS_TO_GROUP = exports.GROUPS_REMOVE_ACCOUNT = exports.GROUPS_ADD_ACCOUNT = exports.GROUPS_REMOVE = exports.GROUPS_ADD = exports.ACCOUNTS_REMOVE = exports.ACCOUNTS_UPDATE = exports.ACCOUNTS_ADD = exports.LOGIN_ACCOUNT = exports.REGISTER_ACCOUNT = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.registerAccount = registerAccount;
exports.loginAccount = loginAccount;
exports.accountsAdd = accountsAdd;
exports.accountsUpdate = accountsUpdate;
exports.accountsRemove = accountsRemove;
exports.groupsAdd = groupsAdd;
exports.groupsRemove = groupsRemove;
exports.groupsAddAccount = groupsAddAccount;
exports.groupsRemoveAccount = groupsRemoveAccount;
exports.moveAccounFromGroup = moveAccounFromGroup;
exports.storeStateWithoutWebSocket = storeStateWithoutWebSocket;
exports.sessionDataAdd = sessionDataAdd;
exports.storeSurveInfo = storeSurveInfo;
exports.taskIdeaAdd = taskIdeaAdd;
exports.taskAddAllSimilarities = taskAddAllSimilarities;
exports.taskAddAllFavourites = taskAddAllFavourites;
exports.taskIncreasePointer = taskIncreasePointer;
exports.synchronize = synchronize;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var REGISTER_ACCOUNT = exports.REGISTER_ACCOUNT = 'REGISTER_ACCOUNT';

var LOGIN_ACCOUNT = exports.LOGIN_ACCOUNT = 'LOGIN_ACCOUNT';

function registerAccount(account) {
  return { type: REGISTER_ACCOUNT, account: account };
}

function loginAccount(login) {
  return { type: LOGIN_ACCOUNT, login: login };
}

var ACCOUNTS_ADD = exports.ACCOUNTS_ADD = 'ACCOUNTS_ADD';
var ACCOUNTS_UPDATE = exports.ACCOUNTS_UPDATE = 'ACCOUNTS_UPDATE';
var ACCOUNTS_REMOVE = exports.ACCOUNTS_REMOVE = 'ACCOUNTS_REMOVE';

function accountsAdd(account) {
  return { type: ACCOUNTS_ADD, payload: account };
}
function accountsUpdate(account) {
  return { type: ACCOUNTS_UPDATE, payload: account };
}
function accountsRemove(account) {
  return { type: ACCOUNTS_REMOVE, payload: account };
}

var GROUPS_ADD = exports.GROUPS_ADD = 'GROUPS_ADD';
var GROUPS_REMOVE = exports.GROUPS_REMOVE = 'GROUPS_REMOVE';

var GROUPS_ADD_ACCOUNT = exports.GROUPS_ADD_ACCOUNT = 'GROUPS_ADD_ACCOUNT';
var GROUPS_REMOVE_ACCOUNT = exports.GROUPS_REMOVE_ACCOUNT = 'GROUPS_REMOVE_ACCOUNT';
var GROUPS_SELECTED_ACCOUNTS_TO_GROUP = exports.GROUPS_SELECTED_ACCOUNTS_TO_GROUP = 'GROUPS_SELECTED_ACCOUNTS_TO_GROUP';
var GROUPS_SELECTED_ACCOUNTS_UNASSIGN = exports.GROUPS_SELECTED_ACCOUNTS_UNASSIGN = 'GROUPS_SELECTED_ACCOUNTS_UNASSIGN';
var GROUPS_ACCOUNTS_UNASSIGN = exports.GROUPS_ACCOUNTS_UNASSIGN = 'GROUPS_ACCOUNTS_UNASSIGN';
var GROUPS_AUTOMATE_CREATION = exports.GROUPS_AUTOMATE_CREATION = 'GROUPS_AUTOMATE_CREATION';

function groupsAdd(_ref) {
  var groupId = _ref.groupId,
      type = _ref.type,
      _ref$list = _ref.list,
      list = _ref$list === undefined ? [] : _ref$list;

  return { type: GROUPS_ADD, payload: { groupId: groupId, type: type, list: list } };
}
function groupsRemove(groupId) {
  return { type: GROUPS_REMOVE, payload: { groupId: groupId } };
}

function groupsAddAccount(groupId, account) {
  return { type: GROUPS_ADD_ACCOUNT, payload: { groupId: groupId, account: account } };
}
function groupsRemoveAccount(groupId, account) {
  return { type: GROUPS_REMOVE_ACCOUNT, payload: { groupId: groupId, account: account } };
}

function moveAccounFromGroup(accounId, toGroup) {
  return function (dispatch, getState) {
    var cState = getState();
    if (!cState.accounts[accounId]) {
      console.log('Account not found');
      console.log(cState);

      return;
    }

    if (cState.accounts[accounId].group) {
      dispatch(groupsRemoveAccount(cState.accounts[accounId].group, accounId));
    }
    dispatch(accountsUpdate((0, _extends3.default)({}, cState.accounts[accounId], { group: toGroup })));
    dispatch(groupsAddAccount(toGroup, accounId));
  };
}

var SEND_ALL_MESSAGE = exports.SEND_ALL_MESSAGE = 'SEND_GROUP_MESSAGE';
var SEND_GROUP_MESSAGE = exports.SEND_GROUP_MESSAGE = 'SEND_GROUP_MESSAGE';
var SEND_ACCOUNT_MESSAGE = exports.SEND_ACCOUNT_MESSAGE = 'SEND_ACCOUNT_MESSAGE';

function storeStateWithoutWebSocket(state) {
  var copyWithoutWS = {};
  var vervose = true;
  if (vervose) {
    console.log('XXXXXXXresult');
    console.log(state);
    console.time('time1');
  }
  for (var key in state) {
    if (key == 'accounts') {
      copyWithoutWS[key] = {};
      copyWithoutWS[key].list = state[key].list;
      state.accounts.list.forEach(function (id) {
        copyWithoutWS.accounts[id] = (0, _extends3.default)({}, state.accounts[id], { ws: null });
      });
      copyWithoutWS.accounts.list.forEach(function (id) {
        delete copyWithoutWS.accounts[id].ws;
      });
    } else {
      copyWithoutWS[key] = state[key];
    }
  }
  if (vervose) {
    console.timeEnd('time1');
    console.log(copyWithoutWS);
    console.log(state);
  }

  return copyWithoutWS;
}

var SESSION_DATA_ADD = exports.SESSION_DATA_ADD = 'SESSION_DATA_ADD';

function sessionDataAdd(sessionData) {
  return { type: SESSION_DATA_ADD, payload: sessionData };
}

var SURVEY_STEP_ALL = exports.SURVEY_STEP_ALL = 'SURVEY_STEP_ALL';

var SUBMIT_SURVEY_INFO = exports.SUBMIT_SURVEY_INFO = 'SUBMIT_SURVEY_INFO';

var STORE_SURVEY_INFO = exports.STORE_SURVEY_INFO = 'STORE_SURVEY_INFO';

function storeSurveInfo(surveyInfo) {
  return { type: STORE_SURVEY_INFO, payload: surveyInfo };
}

var TASK_ADD_IDEA = exports.TASK_ADD_IDEA = 'TASK_ADD_IDEA';

function taskIdeaAdd(idea) {
  return { type: TASK_ADD_IDEA, payload: idea };
}

var TASK_ADD_ALL_SIMILARITIES = exports.TASK_ADD_ALL_SIMILARITIES = 'TASK_ADD_ALL_SIMILARITIES';

function taskAddAllSimilarities(similarities) {
  return { type: TASK_ADD_ALL_SIMILARITIES, payload: similarities };
}

var TASK_ADD_ALL_FAVOURITES = exports.TASK_ADD_ALL_FAVOURITES = 'TASK_ADD_ALL_FAVOURITES';

function taskAddAllFavourites(favourites) {
  return { type: TASK_ADD_ALL_FAVOURITES, payload: favourites };
}

var TASK_INCREASE_POINTER = exports.TASK_INCREASE_POINTER = 'TASK_INCREASE_POINTER';

function taskIncreasePointer() {
  return { type: TASK_INCREASE_POINTER };
}


var WAIT = exports.WAIT = 'WAIT';
var CONTINUE = exports.CONTINUE = 'CONTINUE';

function synchronize(action) {
  switch (action) {
    case 'wait':
    case 'await':
      return { type: WAIT };
    case 'continue':
      return { type: CONTINUE };
    default:
      return { type: WAIT };
  }
}
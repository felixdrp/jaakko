'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTINUE = exports.WAIT = exports.SEND_ACCOUNT_MESSAGE = exports.SEND_GROUP_MESSAGE = exports.SEND_ALL_MESSAGE = exports.GROUPS_ACCOUNTS_UNASSIGN = exports.GROUPS_SELECTED_ACCOUNTS_UNASSIGN = exports.GROUPS_SELECTED_ACCOUNTS_TO_GROUP = exports.GROUPS_REMOVE_ACCOUNT = exports.GROUPS_ADD_ACCOUNT = exports.GROUPS_REMOVE = exports.GROUPS_ADD = exports.ACCOUNTS_REMOVE = exports.ACCOUNTS_UPDATE = exports.ACCOUNTS_ADD = exports.LOGIN_ACCOUNT = exports.REGISTER_ACCOUNT = undefined;

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
exports.synchronize = synchronize;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// SErver actions

// Register a new account in the db and add to the account list
var REGISTER_ACCOUNT = exports.REGISTER_ACCOUNT = 'REGISTER_ACCOUNT';

// Check the account and add to the account list
var LOGIN_ACCOUNT = exports.LOGIN_ACCOUNT = 'LOGIN_ACCOUNT';

function registerAccount(account) {
  return { type: REGISTER_ACCOUNT, account: account };
}

function loginAccount(login) {
  return { type: LOGIN_ACCOUNT, login: login };
}

// Redux: Admin accounts in the server
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

// Create a group of accounts
var GROUPS_ADD = exports.GROUPS_ADD = 'GROUPS_ADD';
var GROUPS_REMOVE = exports.GROUPS_REMOVE = 'GROUPS_REMOVE';

var GROUPS_ADD_ACCOUNT = exports.GROUPS_ADD_ACCOUNT = 'GROUPS_ADD_ACCOUNT';
var GROUPS_REMOVE_ACCOUNT = exports.GROUPS_REMOVE_ACCOUNT = 'GROUPS_REMOVE_ACCOUNT';
var GROUPS_SELECTED_ACCOUNTS_TO_GROUP = exports.GROUPS_SELECTED_ACCOUNTS_TO_GROUP = 'GROUPS_SELECTED_ACCOUNTS_TO_GROUP';
var GROUPS_SELECTED_ACCOUNTS_UNASSIGN = exports.GROUPS_SELECTED_ACCOUNTS_UNASSIGN = 'GROUPS_SELECTED_ACCOUNTS_UNASSIGN';
var GROUPS_ACCOUNTS_UNASSIGN = exports.GROUPS_ACCOUNTS_UNASSIGN = 'GROUPS_ACCOUNTS_UNASSIGN';

function groupsAdd(groupId) {
  var list = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  return { type: GROUPS_ADD, payload: { groupId: groupId, list: list } };
}
function groupsRemove(groupId) {
  return { type: GROUPS_REMOVE, payload: { groupId: groupId } };
}

function groupsAddAccount(groupId, account) {
  return { type: GROUPS_ADD_ACCOUNT, payload: { groupId: groupId, account: account } };
}
// export function groupsUpdateAccount((groupId, account) {
//   return { type: ACCOUNTS_UPDATE, payload: account }
// }
function groupsRemoveAccount(groupId, account) {
  return { type: GROUPS_REMOVE_ACCOUNT, payload: { groupId: groupId, account: account } };
}

// Thunk, to move an account betwen groups.
function moveAccounFromGroup(accounId, toGroup) {
  return function (dispatch, getState) {
    // cState = current state
    var cState = getState();
    if (!cState.accounts[accounId]) {
      console.log('Account not found');
      console.log(cState);

      return;
    }

    if (cState.accounts[accounId].group) {
      // Remove account from it the actual group
      dispatch(groupsRemoveAccount(cState.accounts[accounId].group, accounId));
    }
    // Add the group to the account
    dispatch(accountsUpdate((0, _extends3.default)({}, cState.accounts[accounId], { group: toGroup })));
    // Add the account to the group
    dispatch(groupsAddAccount(toGroup, accounId));
  };
}

var SEND_ALL_MESSAGE = exports.SEND_ALL_MESSAGE = 'SEND_GROUP_MESSAGE';
var SEND_GROUP_MESSAGE = exports.SEND_GROUP_MESSAGE = 'SEND_GROUP_MESSAGE';
var SEND_ACCOUNT_MESSAGE = exports.SEND_ACCOUNT_MESSAGE = 'SEND_ACCOUNT_MESSAGE';

function storeStateWithoutWebSocket(state) {
  var copyWithoutWS = {};
  console.log('XXXXXXXresult');
  console.log(state);
  console.time('time1');
  for (var key in state) {
    if (key == 'accounts') {
      copyWithoutWS[key] = {};
      copyWithoutWS[key].list = state[key].list;
      state.accounts.list.forEach(function (id) {
        copyWithoutWS.accounts[id] = (0, _extends3.default)({}, state.accounts[id], { ws: null });
      });
      // remove ws from accounts before send
      copyWithoutWS.accounts.list.forEach(function (id) {
        delete copyWithoutWS.accounts[id].ws;
      });
    } else {
      copyWithoutWS[key] = state[key];
    }
  }
  console.timeEnd('time1');
  console.log(copyWithoutWS);
  console.log(state);

  return copyWithoutWS;
}

/*
 * action creators
 */

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
//# sourceMappingURL=actions.js.map

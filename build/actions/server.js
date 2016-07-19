'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.synchronize = synchronize;
exports.registerAccount = registerAccount;
exports.loginAccount = loginAccount;
// SErver actions
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

// Register a new account in the db and add to the account list
var REGISTER_ACCOUNT = exports.REGISTER_ACCOUNT = 'REGISTER_ACCOUNT';

// Check the account and add to the account list
var LOGIN_ACCOUNT = exports.LOGIN_ACCOUNT = 'LOGIN_ACCOUNT';

var SEND_ALL_MESSAGE = exports.SEND_ALL_MESSAGE = 'SEND_GROUP_MESSAGE';
var SEND_GROUP_MESSAGE = exports.SEND_GROUP_MESSAGE = 'SEND_GROUP_MESSAGE';
var SEND_ACCOUNT_MESSAGE = exports.SEND_ACCOUNT_MESSAGE = 'SEND_ACCOUNT_MESSAGE';

// Create a group of accounts
var GROUP_CREATE = exports.GROUP_CREATE = 'GROUP_CREATE';
// Create groups autonomously
var GROUP_CREATE_AUTOMATIC = exports.GROUP_CREATE_AUTOMATIC = 'GROUP_CREATE_AUTOMATIC';

var GROUP_ADD_ACCOUNT = exports.GROUP_ADD_ACCOUNT = 'GROUP_ADD_ACCOUNT';
var GROUP_REMOVE_ACCOUNT = exports.GROUP_REMOVE_ACCOUNT = 'GROUP_REMOVE_ACCOUNT';

/*
 * action creators
 */

function registerAccount(account) {
  return { type: REGISTER_ACCOUNT, account: account };
}

function loginAccount(login) {
  return { type: LOGIN_ACCOUNT, login: login };
}
//# sourceMappingURL=server.js.map

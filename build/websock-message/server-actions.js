'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerAccount = registerAccount;
exports.registerAccount = registerAccount;
// Server socket actions
// Socket action types:

var MUTATE = exports.MUTATE = 'MUTATE';
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
function registerAccount(_ref2) {
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
//# sourceMappingURL=server-actions.js.map

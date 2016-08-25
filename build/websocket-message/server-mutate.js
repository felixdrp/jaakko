'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _serverActions = require('./server-actions');

var _actions = require('../actions/actions');

var _clientActions = require('../actions/client-actions');

var _config = require('../config');

var _createAccount = require('../modules/account/create-account');

var _loginAccount = require('../modules/account/login-account');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Mutate will process an asynchronous message from a client send by a websocket
 *
 * @param {Object} An object whose values correspond to:
 *                    action: Async action to process
 *                    payload: The info to process
 *                    ws: websocket that trigger the message.
 * @returns {}
 */

// Redux client actions
// WebSocket communications types
// look doc/server-websocket-message-system.md
exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var action = _ref2.action;
    var payload = _ref2.payload;
    var ws = _ref2.ws;
    var store = _ref2.store;
    var payloadResponse, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payloadResponse = void 0, result = void 0;
            _context.t0 = action;
            _context.next = _context.t0 === _serverActions.REGISTER_ACCOUNT ? 4 : _context.t0 === _serverActions.LOGIN_ACCOUNT ? 16 : 30;
            break;

          case 4:
            _context.next = 6;
            return (0, _createAccount.createAccount)({
              firstName: payload.firstName,
              surename: payload.surename,
              email: payload.email,
              password: payload.password,
              reEnterPassword: payload.password
            }, _config.fieldsOptions);

          case 6:
            result = _context.sent;

            if (!('message' in result)) {
              _context.next = 12;
              break;
            }

            // Error try register again.
            // Send message of error to the client.
            console.error(result.message);
            if (result.message === 'The input field email not valid' || result.message === 'The input field email is not a valid email') {
              payloadResponse = { email: 'The email is not valid' };
            } else if (result.message === 'The input field password not valid') {
              payloadResponse = { password: 'The password is not valid' };
            } else if (result.message === 'Email already used.') {
              payloadResponse = { email: 'Please, choose another email.' };
            }
            // Send email error
            ws.send({
              type: _serverActions.ACTION,
              action: _clientActions.ACCOUNT_REGISTER_ERROR,
              payload: payloadResponse
            });
            return _context.abrupt('return');

          case 12:
            // User registered!!
            //
            // To give websocket.accountCode the account email
            // Register the websocket 'ws.accountCode' with the email.
            // So we can identify the ws with the account email.
            ws.accountCode = payload.email;

            // Register the user in the server store.

            // Log the account in the Client
            ws.send((0, _serverActions.wsLogAccount)({
              email: payload.email,
              firstName: payload.firstName,
              surename: payload.surename,
              token: result
            }));
            // Ready to asign to a group
            return _context.abrupt('return', true);

          case 16:
            _context.next = 18;
            return (0, _loginAccount.loginAccount)({
              email: payload.email,
              password: payload.password
            });

          case 18:
            result = _context.sent;

            console.log(result);

            if (!('message' in result)) {
              _context.next = 25;
              break;
            }

            // Error try login.
            // Send message of error to the client.
            console.error(result.message);
            if (result.message === 'The input field email not valid' || result.message === 'The input field email is not a valid email') {
              payloadResponse = { email: 'The email is not valid' };
            } else if (result.message === 'Password not valid.') {
              payloadResponse = { password: 'The password is not valid' };
            } else if (result.message === 'Account Email not found.') {
              payloadResponse = { email: 'Please, check email and password.' };
            }
            // Send email error
            ws.send({
              type: _serverActions.ACTION,
              action: _clientActions.ACCOUNT_LOGIN_ERROR,
              payload: payloadResponse
            });
            return _context.abrupt('return');

          case 25:
            // Register the websocket 'ws.accountCode' with the email.
            // So we can identify the ws with the account email.
            ws.accountCode = payload.email;

            // Log the account in the Client
            ws.send((0, _serverActions.wsLogAccount)({
              email: payload.email,
              firstName: result.firstName,
              surename: result.surename,
              token: result.token
            }));

            ws.send((0, _serverActions.wsGotoPage)({ url: '/survey/waitSync', options: {} }));

            // console.log('send error login')
            // console.log(ws.name +' '+ message.type + ' ' + message.payload.email)
            return _context.abrupt('return', true);

          case 30:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function mutate(_x) {
    return _ref.apply(this, arguments);
  }

  return mutate;
}();

// Default Input fields type and options


// Redux server actions
//# sourceMappingURL=server-mutate.js.map

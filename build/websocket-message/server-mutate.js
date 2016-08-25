'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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
    var payloadResponse, result, account, reduxStoreServerAndClientRegisterAccountAndGoToWait;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            reduxStoreServerAndClientRegisterAccountAndGoToWait = function reduxStoreServerAndClientRegisterAccountAndGoToWait(account) {
              var tempAccount = void 0;
              // Register the user in the server store.
              store.dispatch((0, _actions.accountsAdd)((0, _extends3.default)({}, account, { group: 'unassigned' })));
              console.log('>>>>>state');

              // Log the account in the Client
              tempAccount = (0, _extends3.default)({}, account, { ws: undefined });
              delete tempAccount.ws;
              ws.send((0, _serverActions.wsLogAccount)(account));
              console.log('>>>>>state');

              // Go to WaitSync to start session
              ws.send((0, _serverActions.wsGotoPage)({ url: '/survey/waitSync', options: {} }));
              console.log('>>>>>state');
            };

            payloadResponse = void 0, result = void 0, account = void 0;
            _context.t0 = action;
            _context.next = _context.t0 === _serverActions.REGISTER_ACCOUNT ? 5 : _context.t0 === _serverActions.LOGIN_ACCOUNT ? 18 : 35;
            break;

          case 5:
            _context.next = 7;
            return (0, _createAccount.createAccount)({
              firstName: payload.firstName,
              surename: payload.surename,
              email: payload.email,
              password: payload.password,
              reEnterPassword: payload.password
            }, _config.fieldsOptions);

          case 7:
            result = _context.sent;

            if (!('message' in result)) {
              _context.next = 13;
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

          case 13:
            // User registered!!
            //
            // To give websocket.accountCode the account email
            // Register the websocket 'ws.accountCode' with the email.
            // So we can identify the ws with the account email.
            ws.accountCode = payload.email;

            account = {
              email: payload.email,
              firstName: payload.firstName,
              surename: payload.surename,
              token: result,
              ws: ws
            };
            reduxStoreServerAndClientRegisterAccountAndGoToWait(account);
            // Ready to asign to a group
            return _context.abrupt('return', true);

          case 18:
            _context.next = 20;
            return (0, _loginAccount.loginAccount)({
              email: payload.email,
              password: payload.password
            });

          case 20:
            result = _context.sent;

            console.log(result);

            if (!('message' in result)) {
              _context.next = 27;
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

          case 27:
            // Register the websocket 'ws.accountCode' with the email.
            // So we can identify the ws with the account email.
            ws.accountCode = payload.email;

            account = {
              email: payload.email,
              firstName: result.firstName,
              surename: result.surename,
              token: result.token,
              ws: ws
            };

            console.log('>>>>>state');
            reduxStoreServerAndClientRegisterAccountAndGoToWait(account);
            console.log('>>>>>state');
            console.log(store.getState());
            // console.log('send error login')
            // console.log(ws.name +' '+ message.type + ' ' + message.payload.email)
            return _context.abrupt('return', true);

          case 35:
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

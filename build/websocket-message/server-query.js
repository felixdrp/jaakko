'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _serverActions = require('./server-actions');

var _queryActions = require('./query-actions');

var _actions = require('../actions/actions');

require('../actions/client-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Query will process an asynchronous message from a client send by a websocket
 *
 * @param {Object} An object whose values correspond to:
 *                    action: Async action to process
 *                    payload: The info to process
 *                    ws: websocket that trigger the message.
 * @returns {}
 */

// Redux server actions
exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var action = _ref2.action;
    var payload = _ref2.payload;
    var ws = _ref2.ws;
    var store = _ref2.store;
    var payloadResponse, result, account;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payloadResponse = void 0, result = void 0, account = void 0;
            _context.t0 = action;
            _context.next = _context.t0 === _queryActions.SESSION_STATE_GET ? 4 : _context.t0 === LOGIN_ACCOUNT ? 7 : 24;
            break;

          case 4:
            // update state in components ControlRoom socket action creator
            payloadResponse = (0, _actions.storeStateWithoutWebSocket)(store.getState());

            ws.send((0, _serverActions.swUpdateControlRoom)(payloadResponse));
            return _context.abrupt('return', true);

          case 7:
            _context.next = 9;
            return loginAccount({
              email: payload.email,
              password: payload.password
            });

          case 9:
            result = _context.sent;

            console.log(result);

            if (!('message' in result)) {
              _context.next = 16;
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
              action: ACCOUNT_LOGIN_ERROR,
              payload: payloadResponse
            });
            return _context.abrupt('return');

          case 16:
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

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function query(_x) {
    return _ref.apply(this, arguments);
  }

  return query;
}();

// Redux client actions
// WebSocket communications types
// look doc/server-websocket-message-system.md
//# sourceMappingURL=server-query.js.map

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _serverActions = require('./server-actions');

var _config = require('../config');

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

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var action = _ref2.action;
    var payload = _ref2.payload;
    var ws = _ref2.ws;
    var store = _ref2.store;
    var result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = action;
            _context.next = _context.t0 === _serverActions.REGISTER_ACCOUNT ? 3 : _context.t0 === _serverActions.LOGIN_ACCOUNT ? 10 : 13;
            break;

          case 3:
            _context.next = 5;
            return createAccount({
              firstName: payload.firstName,
              surename: payload.surename,
              email: payload.email,
              password: payload.password,
              reEnterPassword: payload.password
            }, _config.fieldsOptions);

          case 5:
            result = _context.sent;

            if ('message' in result) {
              // Error try register again.
              // Send message of error to the client.
              console.error(result.message);
            }
            // User registered!!
            // To give websocket.accountCode the account email
            ws.accountCode = payload.email;
            // Register the user in the server store.

            // Ready to asign to a group
            return _context.abrupt('return', true);

          case 10:
            // Send email error
            ws.send((0, _stringify2.default)({
              type: 'ACTION',
              action: 'LOGIN_ERROR_BAD_EMAIL',
              payload: null
            }));
            // console.log('send error login')
            // console.log(ws.name +' '+ message.type + ' ' + message.payload.email)
            return _context.abrupt('return', true);

          case 13:
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
//# sourceMappingURL=server-mutate.js.map

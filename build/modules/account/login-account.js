'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginAccount = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var loginAccount = exports.loginAccount = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(input, options) {
    var error, fields, newfieldsOptions, option, db, colUser, res, token, passport, user;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!input || (typeof input === 'undefined' ? 'undefined' : (0, _typeof3.default)(input)) !== 'object')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', (0, _error.reportError)('Login input type not valid', 'Input fields is not an object type.', 'LOGIN_TYPE_ERROR', '0d8969d0-102d-4ece-a742-4aad7cead869'));

          case 2:
            error = {};
            fields = {
              email: input.email || '',
              password: input.password || '',
              hash: input.hash || ''
            };
            newfieldsOptions = void 0;


            if (options && (typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) === 'object') {
              newfieldsOptions = (0, _deepmerge2.default)(_config.fieldsOptions, options);
            } else {
              newfieldsOptions = (0, _extends3.default)({}, _config.fieldsOptions);
            }

            // Remove options don't used by loginAccount
            _context.t0 = _regenerator2.default.keys(newfieldsOptions);

          case 7:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 16;
              break;
            }

            option = _context.t1.value;
            _context.t2 = option;
            _context.next = _context.t2 === 'email' ? 12 : _context.t2 === 'password' ? 12 : _context.t2 === 'hash' ? 12 : 13;
            break;

          case 12:
            return _context.abrupt('continue', 7);

          case 13:
            delete newfieldsOptions[option];

          case 14:
            _context.next = 7;
            break;

          case 16:
            // console.log('LLL> ' + Object.keys(newfieldsOptions))

            // Check fields with its options
            error = _checkField2.default.checkAll(fields, newfieldsOptions);

            if (!(error !== null)) {
              _context.next = 19;
              break;
            }

            return _context.abrupt('return', error);

          case 19:

            // Check login
            db = null, colUser = null, res = null, token = null, passport = null, user = null;
            _context.prev = 20;
            _context.next = 23;
            return _mongodb.MongoClient.connect(_config.mongodbConf.url);

          case 23:
            db = _context.sent;

            // Check the user/email is not taken
            colUser = db.collection('User');
            _context.next = 27;
            return colUser.findOne({ email: fields.email });

          case 27:
            user = _context.sent;

            if (!(user === null)) {
              _context.next = 31;
              break;
            }

            db.close();
            return _context.abrupt('return', (0, _error.reportError)('Account Email not found.', 'Account Email not found.', 'LOGIN_ACCOUNT_NOT_FOUND_ERROR', 'bf4fe14b-a186-4ab6-98d9-a5435e321854'));

          case 31:
            _context.next = 33;
            return db.collection('Passport').findOne({ user: user._id });

          case 33:
            passport = _context.sent;

            res = _bcryptjs2.default.compareSync(fields.password, passport.password);
            // If res = false then password not valid

            if (!(res === false)) {
              _context.next = 38;
              break;
            }

            db.close();
            return _context.abrupt('return', (0, _error.reportError)('Password not valid.', 'The input password is not the same as the account\'s password', 'LOGIN_ACCOUNT_PASSWORD_ERROR', '5b8b302d-9da7-49ae-8a92-12f34fd658b3'));

          case 38:

            db.close();
            return _context.abrupt('return', user.token);

          case 42:
            _context.prev = 42;
            _context.t3 = _context['catch'](20);

            if (db) {
              db.close();
            }

            if (!(db === null || _context.t3.constains('connect ECONNREFUSED'))) {
              _context.next = 47;
              break;
            }

            return _context.abrupt('return', (0, _error.reportError)('Database connection error.', 'It was an error in the connection with the database.', 'DATA_BASE_CONNECTION_ERROR', 'a7c5bbb7-ee5c-45fe-af13-29e3c2cda683'));

          case 47:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[20, 42]]);
  }));

  return function loginAccount(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _checkField = require('../check-field');

var _checkField2 = _interopRequireDefault(_checkField);

var _error = require('../log/error');

var _mongodb = require('mongodb');

var _config = require('../../config');

var _tokenGenerator = require('../token-generator');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=login-account.js.map

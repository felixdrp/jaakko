'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAccount = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var deleteAccount = exports.deleteAccount = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(fields) {
    var db, res, UserID, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = null, res = null, UserID = null, result = null;
            _context.prev = 1;
            _context.next = 4;
            return _mongodb.MongoClient.connect(_config.mongodbConf.url);

          case 4:
            db = _context.sent;
            _context.next = 7;
            return db.collection('User').findOne({ email: fields.email });

          case 7:
            res = _context.sent;

            if (!(res === null)) {
              _context.next = 11;
              break;
            }

            result = (0, _error.reportError)('User not created.', 'It was an error registering user.', 'ACCOUNT_REGISTER_ERROR', '719b4603-4796-4f2d-b452-20aaafdcfb46');
            return _context.abrupt('return', result);

          case 11:
            _context.next = 13;
            return db.collection('Passport').deleteOne({ user: res._id });

          case 13:
            res = _context.sent;
            _context.next = 16;
            return db.collection('User').deleteOne({ email: fields.email });

          case 16:
            result = _context.sent;


            db.close();

            if (!(res.result.ok & result.result.ok)) {
              _context.next = 20;
              break;
            }

            return _context.abrupt('return', true);

          case 20:
            _context.next = 26;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context['catch'](1);

            if (db) {
              db.close();
            }
            if (db === null || _context.t0.constains('connect ECONNREFUSED')) {
              result = (0, _error.reportError)('Database connection error.', 'It was an error in the connection with the database.', 'DATA_BASE_CONNECTION_ERROR', 'a7c5bbb7-ee5c-45fe-af13-29e3c2cda683');
            }

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 22]]);
  }));

  return function deleteAccount(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _error = require('../log/error');

var _mongodb = require('mongodb');

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
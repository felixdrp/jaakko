'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAccount = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var createAccount = exports.createAccount = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(input, options) {
    var error, fields, newfieldsOptions, db, colUser, res, token, newUserID;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!input || (typeof input === 'undefined' ? 'undefined' : (0, _typeof3.default)(input)) !== 'object')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', (0, _error.reportError)('Register input type not valid', 'Input fields is not an object type.', 'RINV', '30db4b60-fe9e-4c97-87fd-3149c26fe560'));

          case 2:
            // console.log(Object.keys(fieldsOptions))
            // console.log(JSON.stringify(fieldsOptions))

            error = {};
            fields = (0, _extends3.default)({
              firstName: '',
              surename: '',
              email: '',
              password: '',
              reEnterPassword: ''
            }, input);
            newfieldsOptions = void 0;


            if (options && (typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) === 'object') {
              newfieldsOptions = (0, _deepmerge2.default)(_config.fieldsOptions, options);
            } else {
              newfieldsOptions = (0, _extends3.default)({}, _config.fieldsOptions);
            }

            // Check fields
            error = _checkField2.default.checkAll(fields, newfieldsOptions);

            if (!(error !== null)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', error);

          case 9:
            if (!(fields.password !== fields.reEnterPassword)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return', (0, _error.reportError)('Register input fields password and re enter password are not equal.', 'Fields password and re enter password are not equal', 'RIFPREPNEQUAL', '9bcde4cf-9d1f-4b68-8f6f-00e7a3ac965f'));

          case 11:
            db = null, colUser = null, res = null, token = null, newUserID = null;
            _context.prev = 12;
            _context.next = 15;
            return _mongodb.MongoClient.connect(_config.mongodbConf.url);

          case 15:
            db = _context.sent;

            // Check the user/email is not taken
            colUser = db.collection('User');
            _context.next = 19;
            return colUser.findOne({ email: fields.email });

          case 19:
            res = _context.sent;

            if (!(res !== null)) {
              _context.next = 23;
              break;
            }

            db.close();
            return _context.abrupt('return', (0, _error.reportError)('Email already used.', 'The email is already used.', 'REGISTER_EMAIL_ALREADY_TAKEN_ERROR', '4428b93b-3934-4137-aee1-5575c3e98360'));

          case 23:
            // Create an mondoDB ObjectID for the new user
            newUserID = new _mongodb.ObjectID();
            // Pass the token provided or create a new token
            _context.t0 = fields.token;

            if (_context.t0) {
              _context.next = 29;
              break;
            }

            _context.next = 28;
            return (0, _tokenGenerator.createToken)();

          case 28:
            _context.t0 = _context.sent;

          case 29:
            token = _context.t0;
            _context.next = 32;
            return db.collection('User').insertOne({
              _id: newUserID,
              firstName: fields.firstName,
              surename: fields.surename,
              email: fields.email,
              uploadAsPrivate: true,
              token: token,
              tokenupdate: new Date(),
              question: ''
            });

          case 32:
            res = _context.sent;
            _context.next = 35;
            return db.collection('Passport').insertOne({
              user: newUserID,
              password: _bcryptjs2.default.hashSync(fields.password),
              hash: fields.hash || _crypto2.default.createHash('sha512').update(fields.email + fields.password).digest('base64'),
              provider: 'local',
              identifier: '',
              // Hardcoding for oauth2
              accessToken: '',
              refreshToken: '',
              answer: ''
            });

          case 35:
            res = _context.sent;
            _context.next = 43;
            break;

          case 38:
            _context.prev = 38;
            _context.t1 = _context['catch'](12);

            if (db) {
              db.close();
            }

            if (!(db === null || _context.t1.constains('connect ECONNREFUSED'))) {
              _context.next = 43;
              break;
            }

            return _context.abrupt('return', (0, _error.reportError)('Database connection error.', 'It was an error in the connection with the database.', 'DATA_BASE_CONNECTION_ERROR', 'a7c5bbb7-ee5c-45fe-af13-29e3c2cda683'));

          case 43:

            // // console.log('>>>>>>> ' + JSON.stringify(fieldsOptions,null,2) )
            // // console.log('>>>>>>> ' + JSON.stringify(options,null,2) )
            // console.log('Fields >>>>>>> ' + JSON.stringify(fields) )
            // console.log('OPTIONS >>>>>>> ' + JSON.stringify(fieldsOptions) )
            db.close();
            return _context.abrupt('return', token);

          case 45:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[12, 38]]);
  }));

  return function createAccount(_x, _x2) {
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

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=create-account.js.map

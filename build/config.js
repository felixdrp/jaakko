'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldsOptions = exports.graphQLServerOptions = exports.mongodbConf = exports.port = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = exports.port = typeof window === 'undefined' ? 8008 : window.document.location.port;

var mongodbConf = exports.mongodbConf = {
  url: 'mongodb://localhost:27017/jaakko'
};

var graphQLServerOptions = exports.graphQLServerOptions = {
  port: port,
  host: typeof window === 'undefined' ? 'localhost' : window.document.location.hostname,
  method: 'POST',
  path: '/graphql',
  headers: { 'http-client-custom': 'v1' }
};

var nameAndsurnameOptions = {
  type: 'alphanumeric',
  min: 1,
  max: 50,
  mustHave: true
};

var passwordOptions = {
  type: 'password',
  min: 4,
  max: 50,
  mustHave: true
};

var fieldsOptions = exports.fieldsOptions = {
  firstName: (0, _extends3.default)({}, nameAndsurnameOptions),
  surname: (0, _extends3.default)({}, nameAndsurnameOptions),
  email: { type: 'email', min: 8, max: 50, mustHave: true },
  password: (0, _extends3.default)({}, passwordOptions),
  reEnterPassword: (0, _extends3.default)({}, passwordOptions),
  token: { type: 'token', min: 32, max: 32, mustHave: false }
};
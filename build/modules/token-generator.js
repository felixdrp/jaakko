'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.createToken = createToken;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createToken() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;

  return new _promise2.default(function (resolve, reject) {
    _crypto2.default.randomBytes(size, function (err, buf) {
      if (err) {
        reject(err);
      }
      resolve(buf.toString('hex'));
    });
  });
} 

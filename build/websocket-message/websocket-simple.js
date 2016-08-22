'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Facade object to use websocket
// Check that we will send a string every time

var WebSocketSimple = function () {
  function WebSocketSimple(initialWebsocket) {
    (0, _classCallCheck3.default)(this, WebSocketSimple);

    this.ws = initialWebsocket;
    // console.log('Initiated ')
  }

  (0, _createClass3.default)(WebSocketSimple, [{
    key: 'send',
    value: function send(data) {
      var message = void 0;
      if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object') {
        message = (0, _stringify2.default)(data);
      }
      this.ws.send(message);
    }
  }, {
    key: 'accountCode',
    set: function set(code) {
      this.ws.accountCode = code;
    },
    get: function get() {
      return this.ws.accountCode;
    }
  }]);
  return WebSocketSimple;
}();

exports.default = WebSocketSimple;
//# sourceMappingURL=websocket-simple.js.map

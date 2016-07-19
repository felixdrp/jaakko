'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = synchronize;

var _server = require('../actions/server');

function synchronize() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? { wait: true } : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _server.WAIT:
      return { wait: true };
    case _server.CONTINUE:
      return { wait: false };
    default:
      return state;
  }
}
//# sourceMappingURL=sync.js.map

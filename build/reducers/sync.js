'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = synchronize;

var _actions = require('../actions/actions');

function synchronize() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { wait: true };
  var action = arguments[1];

  switch (action.type) {
    case _actions.WAIT:
      return { wait: true };
    case _actions.CONTINUE:
      return { wait: false };
    default:
      return state;
  }
}
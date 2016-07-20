'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reportError = reportError;
function reportError() {
  var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var deepMessage = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
  var code = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
  var uuid = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

  return {
    type: 'error',
    message: message,
    deepMessage: deepMessage,
    code: code,
    uuid: uuid
  };
}
//# sourceMappingURL=error.js.map

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SESSION_STATE_GET = undefined;
exports.wsSessionStateGet = wsSessionStateGet;

var _serverActions = require('./server-actions');

// Queries to the server

// Get the session store state.
var SESSION_STATE_GET = exports.SESSION_STATE_GET = 'SESSION_STATE_GET';

function wsSessionStateGet() {
  return {
    type: _serverActions.QUERY,
    action: SESSION_STATE_GET
  };
}
//# sourceMappingURL=query-actions.js.map

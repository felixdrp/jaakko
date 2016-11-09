'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SURVEY_STATE_GET = exports.SESSION_STATE_GET = undefined;
exports.wsSessionStateGet = wsSessionStateGet;
exports.wsSurveyStateGet = wsSurveyStateGet;

var _serverActions = require('./server-actions');


var SESSION_STATE_GET = exports.SESSION_STATE_GET = 'SESSION_STATE_GET';

function wsSessionStateGet() {
  return {
    type: _serverActions.QUERY,
    action: SESSION_STATE_GET
  };
}

var SURVEY_STATE_GET = exports.SURVEY_STATE_GET = 'SURVEY_STATE_GET';
function wsSurveyStateGet(accountId) {
  return {
    type: _serverActions.QUERY,
    action: SURVEY_STATE_GET,
    payload: accountId
  };
}
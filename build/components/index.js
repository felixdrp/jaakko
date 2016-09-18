'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wait = exports.Instructions = exports.Question = exports.AltObjectTask = exports.MathChallenge = exports.Example = exports.SurveyContainer = exports.CommonViewContainer = exports.AppContainer = exports.SessionManager = exports.GroupManager = exports.ControlRoom = exports.AccountSignUp = exports.AccountSignIn = undefined;

var _signin = require('./account/signin');

var _signin2 = _interopRequireDefault(_signin);

var _signup = require('./account/signup');

var _signup2 = _interopRequireDefault(_signup);

var _controlRoom = require('./admin/control-room');

var _controlRoom2 = _interopRequireDefault(_controlRoom);

var _groupManager = require('./admin/groups/group-manager');

var _groupManager2 = _interopRequireDefault(_groupManager);

var _sessionManager = require('./admin/session/session-manager');

var _sessionManager2 = _interopRequireDefault(_sessionManager);

var _appContainer = require('./app-container');

var _appContainer2 = _interopRequireDefault(_appContainer);

var _commonViewContainer = require('./common-view-container');

var _commonViewContainer2 = _interopRequireDefault(_commonViewContainer);

var _surveyContainer = require('./survey/survey-container');

var _surveyContainer2 = _interopRequireDefault(_surveyContainer);

var _example = require('./survey/example');

var _example2 = _interopRequireDefault(_example);

var _mathChallenge = require('./survey/math-challenge');

var _mathChallenge2 = _interopRequireDefault(_mathChallenge);

var _altObjectTask = require('./survey/alt-object-task');

var _altObjectTask2 = _interopRequireDefault(_altObjectTask);

var _question = require('./survey/question');

var _question2 = _interopRequireDefault(_question);

var _instructions = require('./survey/instructions');

var _instructions2 = _interopRequireDefault(_instructions);

var _wait = require('./survey/wait');

var _wait2 = _interopRequireDefault(_wait);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.AccountSignIn = _signin2.default; /**
                                           * Module to export the components needed by react-router (please look ./src/routes.js)
                                           *
                                           */

// Account

exports.AccountSignUp = _signup2.default;

// Admin Page

exports.ControlRoom = _controlRoom2.default;
exports.GroupManager = _groupManager2.default;
exports.SessionManager = _sessionManager2.default;

// Generic

exports.AppContainer = _appContainer2.default;
exports.CommonViewContainer = _commonViewContainer2.default;

// Survey

exports.SurveyContainer = _surveyContainer2.default;
exports.Example = _example2.default;
exports.MathChallenge = _mathChallenge2.default;
exports.AltObjectTask = _altObjectTask2.default;
exports.Question = _question2.default;
exports.Instructions = _instructions2.default;
exports.Wait = _wait2.default;
//# sourceMappingURL=index.js.map

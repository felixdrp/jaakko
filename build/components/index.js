'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wait = exports.Results = exports.Similarities = exports.Favourites = exports.Instructions = exports.Question = exports.AltObjectTask = exports.MathResults = exports.MathChallenge = exports.Example = exports.CommonViewContainer = exports.AppContainer = exports.ControlRoom = exports.AccountSignUp = exports.AccountSignIn = undefined;

var _signin = require('./account/signin');

var _signin2 = _interopRequireDefault(_signin);

var _signup = require('./account/signup');

var _signup2 = _interopRequireDefault(_signup);

var _controlRoom = require('./admin/control-room');

var _controlRoom2 = _interopRequireDefault(_controlRoom);

var _appContainer = require('./app-container');

var _appContainer2 = _interopRequireDefault(_appContainer);

var _commonViewContainer = require('./common-view-container');

var _commonViewContainer2 = _interopRequireDefault(_commonViewContainer);

var _example = require('./survey/example');

var _example2 = _interopRequireDefault(_example);

var _mathChallenge = require('./survey/math-challenge');

var _mathChallenge2 = _interopRequireDefault(_mathChallenge);

var _mathResults = require('./survey/math-results');

var _mathResults2 = _interopRequireDefault(_mathResults);

var _altObjectTask = require('./survey/alt-object-task');

var _altObjectTask2 = _interopRequireDefault(_altObjectTask);

var _question = require('./survey/question');

var _question2 = _interopRequireDefault(_question);

var _instructions = require('./survey/instructions');

var _instructions2 = _interopRequireDefault(_instructions);

var _favourites = require('./survey/favourites');

var _favourites2 = _interopRequireDefault(_favourites);

var _similarities = require('./survey/similarities');

var _similarities2 = _interopRequireDefault(_similarities);

var _results = require('./survey/results');

var _results2 = _interopRequireDefault(_results);

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

// Generic

exports.AppContainer = _appContainer2.default;
exports.CommonViewContainer = _commonViewContainer2.default;

// Survey

exports.Example = _example2.default;
exports.MathChallenge = _mathChallenge2.default;
exports.MathResults = _mathResults2.default;
exports.AltObjectTask = _altObjectTask2.default;
exports.Question = _question2.default;
exports.Instructions = _instructions2.default;
exports.Favourites = _favourites2.default;
exports.Similarities = _similarities2.default;
exports.Results = _results2.default;
exports.Wait = _wait2.default;
//# sourceMappingURL=index.js.map

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _serverActions = require('./server-actions');

var _queryActions = require('./query-actions');

var _surveyTypes = require('../components/survey/survey-types');

var _actions = require('../actions/actions');

require('../actions/client-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Query will process an asynchronous message from a client send by a websocket
 *
 * @param {Object} An object whose values correspond to:
 *                    action: Async action to process
 *                    payload: The info to process
 *                    ws: websocket that trigger the message.
 * @returns {}
 */

// Redux server actions
// WebSocket communications types
// look doc/server-websocket-message-system.md
exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var action = _ref2.action,
        payload = _ref2.payload,
        ws = _ref2.ws,
        store = _ref2.store;
    var payloadResponse, result, account, temp;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payloadResponse = void 0, result = void 0, account = void 0, temp = {};
            _context.t0 = action;
            _context.next = _context.t0 === _queryActions.SESSION_STATE_GET ? 4 : _context.t0 === _queryActions.SURVEY_STATE_GET ? 7 : 70;
            break;

          case 4:
            // update state in components ControlRoom socket action creator
            payloadResponse = (0, _actions.storeStateWithoutWebSocket)(store.getState());

            ws.send((0, _serverActions.swUpdateControlRoom)(payloadResponse));
            return _context.abrupt('return', true);

          case 7:
            // Send initial values to the surveys if needed
            temp = {};
            result = store.getState();
            account = payload;

            if (result.accounts.list.includes(account)) {
              _context.next = 13;
              break;
            }

            console.log(_queryActions.SURVEY_STATE_GET + ': Account not found');
            return _context.abrupt('return', false);

          case 13:
            temp.account = result.accounts[account];
            temp.type = result.session.surveyPath[temp.account.surveyPointer].type;

            _context.t1 = temp.type;
            _context.next = _context.t1 === _surveyTypes.INSTRUCTIONS ? 18 : _context.t1 === _surveyTypes.ALT_OBJECT_TASK ? 18 : _context.t1 === _surveyTypes.QUESTION ? 21 : _context.t1 === _surveyTypes.SIMILARITIES ? 24 : _context.t1 === _surveyTypes.FAVOURITES ? 32 : _context.t1 === _surveyTypes.RESULTS ? 39 : _context.t1 === _surveyTypes.MATH_RESULTS ? 53 : 68;
            break;

          case 18:
            temp.payload = result.session.surveyPath[temp.account.surveyPointer].payload;

            ws.send((0, _serverActions.swSetSurveyInitials)({ groupType: result.groups[temp.account.group].type, taskType: temp.payload }));

            return _context.abrupt('return');

          case 21:
            temp.payload = result.session.surveyPath[temp.account.surveyPointer].payload;

            ws.send((0, _serverActions.swSetSurveyInitials)(temp.payload));

            return _context.abrupt('return');

          case 24:

            temp.selectedGroup = 0;
            console.log("this is the current group: " + temp.account.group);
            //  debugger;
            if (temp.account.surveyPointer > 17) {
              if (result.groups.list.indexOf(temp.account.group) - 1 < 0) {
                temp.selectedGroup = result.groups.list[result.groups.list.length - 1];
              } else {
                temp.selectedGroup = result.groups.list[result.groups.list.indexOf(temp.account.group) - 1];
              }
            } else {
              if (result.groups.list.indexOf(temp.account.group) + 1 >= result.groups.list.length) {
                temp.selectedGroup = result.groups.list[0];
              } else {
                temp.selectedGroup = result.groups.list[result.groups.list.indexOf(temp.account.group) + 1];
              }
            }

            temp.payload = {
              group: temp.selectedGroup,
              groupType: result.groups[temp.selectedGroup].type,
              ideas: result.task.taskList[result.task.taskPointer].filter(function (element) {
                return temp.selectedGroup == element.group;
              })
            };

            console.log('SIMILARITIES SIMILARITIES SIMILARITIES SIMILARITIES SIMILARITIES SIMILARITIES');
            console.log(temp.payload);

            ws.send((0, _serverActions.swSetSurveyInitials)(temp.payload));

            return _context.abrupt('return');

          case 32:

            temp.selectedGroup = 0;
            //  debugger;
            if (temp.account.surveyPointer > 17) {
              if (result.groups.list.indexOf(temp.account.group) + 1 >= result.groups.list.length) {
                temp.selectedGroup = result.groups.list[0];
              } else {
                temp.selectedGroup = result.groups.list[result.groups.list.indexOf(temp.account.group) + 1];
              }
            } else {
              if (result.groups.list.indexOf(temp.account.group) - 1 < 0) {
                temp.selectedGroup = result.groups.list[result.groups.list.length - 1];
              } else {
                temp.selectedGroup = result.groups.list[result.groups.list.indexOf(temp.account.group) - 1];
              }
            }

            temp.payload = {
              group: temp.selectedGroup,
              groupType: result.groups[temp.selectedGroup].type,
              ideas: result.task.similarList[result.task.taskPointer].filter(function (element) {
                return temp.selectedGroup == element.group;
              })
            };
            // if ( result.groups.list.indexOf(temp.account.group) - 1 < 0 ) {
            //   temp.selectedGroup = result.groups.list[ result.groups.list.length - 1 ]
            //   temp.payload = {
            //     group: temp.selectedGroup,
            //     groupType: result.groups[ temp.selectedGroup ].type,
            //     ideas: result.task.similarList[ result.task.taskPointer ].filter(
            //       element => temp.selectedGroup == element.group
            //     ),
            //   }
            // } else {
            //   temp.selectedGroup = result.groups.list[ result.groups.list.indexOf(temp.account.group) - 1 ]
            //   temp.payload = {
            //     group: temp.selectedGroup,
            //     groupType: result.groups[ temp.selectedGroup ].type,
            //     ideas: result.task.similarList[ result.task.taskPointer ].filter(
            //       element => temp.selectedGroup == element.group
            //     ),
            //   }
            // }

            console.log('FAVOURITES FAVOURITES FAVOURITES FAVOURITES FAVOURITES FAVOURITES');
            console.log(temp.payload);

            ws.send((0, _serverActions.swSetSurveyInitials)(temp.payload));
            return _context.abrupt('return');

          case 39:
            _context.prev = 39;


            console.log('PRE PRE RESULTS RESULTS RESULTS RESULTS RESULTS RESULTS');
            result = (0, _actions.storeStateWithoutWebSocket)(result);
            temp.payload = {
              group: temp.account.group,
              groupType: result.groups[temp.account.group].type,
              accounts: result.accounts,
              ideas: result.task.favouritList[result.task.taskPointer].filter(function (element) {
                return temp.account.group == element.group;
              })
            };

            console.log('RESULTS RESULTS RESULTS RESULTS RESULTS RESULTS');
            console.log(temp.payload);

            ws.send((0, _serverActions.swSetSurveyInitials)(temp.payload));
            return _context.abrupt('return');

          case 49:
            _context.prev = 49;
            _context.t2 = _context['catch'](39);

            console.log("CAGADA: " + _context.t2);

          case 52:
            return _context.abrupt('return');

          case 53:
            _context.prev = 53;

            console.log('PRE PRE MATH_MATH_RESULTS MATH_MATH_RESULTS MATH_MATH_RESULTS MATH_MATH_RESULTS MATH_MATH_RESULTS MATH_MATH_RESULTS');
            result = (0, _actions.storeStateWithoutWebSocket)(result);
            temp.mathPointer = result.session.surveyPath.findIndex(function (element) {
              return element.type == _surveyTypes.MATH_CHALLENGE;
            });

            temp.payload = {
              group: temp.account.group,
              groupType: result.groups[temp.account.group].type,
              accounts: result.accounts,
              mathResults: result.results.surveyInfo.filter(function (element) {
                return temp.mathPointer == element.surveyId && temp.account.group == element.groupId;
              })
            };

            console.log('MATH_RESULTS MATH_RESULTS MATH_RESULTS MATH_RESULTS MATH_RESULTS MATH_RESULTS');
            console.log(temp.payload);

            ws.send((0, _serverActions.swSetSurveyInitials)(temp.payload));
            return _context.abrupt('return');

          case 64:
            _context.prev = 64;
            _context.t3 = _context['catch'](53);

            console.log("CAGADA: " + _context.t3);

          case 67:
            return _context.abrupt('return');

          case 68:

            console.log('SESSION_STATE_GET return!!!');
            return _context.abrupt('return');

          case 70:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[39, 49], [53, 64]]);
  }));

  function query(_x) {
    return _ref.apply(this, arguments);
  }

  return query;
}();
// groupsAdd,
// groupsRemove,
// groupsAddAccount,
// groupsRemoveAccount,
// moveAccounFromGroup,


// Redux client actions
//# sourceMappingURL=server-query.js.map

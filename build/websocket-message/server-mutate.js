'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _serverActions = require('./server-actions');

var _actions = require('../actions/actions');

var _clientActions = require('../actions/client-actions');

var _config = require('../config');

var _createAccount = require('../modules/account/create-account');

var _loginAccount = require('../modules/account/login-account');

var _surveyTypes = require('../components/survey/survey-types');

var _websocketSimple = require('./websocket-simple');

var _websocketSimple2 = _interopRequireDefault(_websocketSimple);

var _similarity = require('../modules/similarity');

var _similarity2 = _interopRequireDefault(_similarity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import filterAccountsByGroup from '../modules/filter-accounts-by-group'


/**
 * Mutate will process an asynchronous message from a client send by a websocket
 *
 * @param {Object} An object whose values correspond to:
 *                    action: Async action to process
 *                    payload: The info to process
 *                    ws: websocket that trigger the message.
 * @returns {}
 */

// Default Input fields type and options


// Redux server actions
// WebSocket communications types
// look doc/server-websocket-message-system.md
exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref2, clientsSocket) {
    var _this = this;

    var action = _ref2.action,
        payload = _ref2.payload,
        ws = _ref2.ws,
        store = _ref2.store;

    var payloadResponse, result, account, temp, reduxStoreServerAndClientRegisterAccountAndGoToWait, removeGroup, removeAccountFromGroup, addAccountToGroup, nextStep, aggregated, found, entry, f, e, _ret;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            nextStep = function nextStep(accountId) {
              var tempWs = '';
              var index = clientsSocket.clients.findIndex(function (wsElement) {
                return wsElement.accountCode == accountId;
              });
              if (index >= 0) {
                // debugger

                tempWs = new _websocketSimple2.default(clientsSocket.clients[index]);
              } else {
                console.log('accountId not found. It looks like not connected > ' + accountId);
                // console.error(Object.keys(mainSockets))
                // throw Error('accountId not found')
                return false;
              }
              // Get the session survey
              var result = store.getState();
              var account = result.accounts[accountId];
              var accountSessionPointer = 'surveyPointer' in account ? account.surveyPointer + 1 : 0;
              store.dispatch((0, _actions.accountsUpdate)((0, _extends3.default)({}, account, { surveyPointer: accountSessionPointer })));
              // Go to WaitSync to start session
              tempWs.send((0, _serverActions.wsGotoPage)({ url: (0, _surveyTypes.resolveSurveyURL)(result.session.surveyPath[accountSessionPointer].type), options: {} }));
            };

            addAccountToGroup = function addAccountToGroup(accountId, groupId, store) {
              var result = store.getState();
              if (result.accounts[accountId].group == 'unassigned') {
                store.dispatch((0, _actions.groupsAddAccount)(groupId, accountId));
                store.dispatch((0, _actions.accountsUpdate)((0, _extends3.default)({}, result.accounts[accountId], { group: groupId })));
              } else {
                store.dispatch((0, _actions.moveAccounFromGroup)(accountId, groupId));
              }
            };

            removeAccountFromGroup = function removeAccountFromGroup(accountId, store) {
              var result = store.getState();
              // remove account from group
              store.dispatch((0, _actions.groupsRemoveAccount)(result.accounts[accountId].group, accountId));
              // account to 'unassigned'
              store.dispatch((0, _actions.accountsUpdate)((0, _extends3.default)({}, result.accounts[accountId], { group: 'unassigned' })));
            };

            removeGroup = function removeGroup(groupId, store) {
              var result = store.getState();
              result.groups[groupId].accountList.map(function (accountId) {
                return store.dispatch((0, _actions.accountsUpdate)((0, _extends3.default)({}, result.accounts[accountId], { group: 'unassigned' })));
              });
              store.dispatch((0, _actions.groupsRemove)(groupId));
            };

            reduxStoreServerAndClientRegisterAccountAndGoToWait = function reduxStoreServerAndClientRegisterAccountAndGoToWait(account) {
              var tempAccount = void 0;
              // Register the user in the server store.
              store.dispatch((0, _actions.accountsAdd)((0, _extends3.default)({}, account, { group: 'unassigned' })));
              console.log('>>>>>state');

              // Log the account in the Client
              tempAccount = _immutable2.default.fromJS(account);
              // Remove the websocket from the object
              tempAccount = tempAccount.delete('ws');
              tempAccount = tempAccount.toJS();

              ws.send((0, _serverActions.wsLogAccount)(tempAccount));
              console.log('>>>>>state');

              // // Go to WaitSync to start session
              // ws.send(
              //   wsGotoPage({ url: '/survey/waitSync', options: {} })
              // )

              nextStep(account.email);
              console.log('>>>>>state');
            };

            payloadResponse = void 0, result = void 0, account = void 0, temp = {};

            /*
            * Function that moves the account to the next survey.
            * It increases the account survey pointer and move this survey pointer number.
            */

            return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
              var drawGroups, orderedGroupsAndAccounts, accountId, group, groupId, random, i, _i2, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, acc, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _acc;

              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.t0 = action;
                      _context.next = _context.t0 === _serverActions.REGISTER_ACCOUNT ? 3 : _context.t0 === _serverActions.LOGIN_ACCOUNT ? 15 : _context.t0 === _actions.GROUPS_ADD ? 31 : _context.t0 === _actions.GROUPS_REMOVE ? 33 : _context.t0 === _actions.GROUPS_ADD_ACCOUNT ? 36 : _context.t0 === _actions.GROUPS_REMOVE_ACCOUNT ? 37 : _context.t0 === _actions.GROUPS_SELECTED_ACCOUNTS_TO_GROUP ? 38 : _context.t0 === _actions.GROUPS_SELECTED_ACCOUNTS_UNASSIGN ? 41 : _context.t0 === _actions.GROUPS_ACCOUNTS_UNASSIGN ? 44 : _context.t0 === _actions.GROUPS_AUTOMATE_CREATION ? 47 : _context.t0 === _actions.SURVEY_STEP_ALL ? 117 : _context.t0 === _actions.SUBMIT_SURVEY_INFO ? 119 : _context.t0 === _serverActions.TASK_IDEA_ADD ? 173 : 177;
                      break;

                    case 3:
                      _context.next = 5;
                      return (0, _createAccount.createAccount)({
                        firstName: payload.firstName,
                        surname: payload.surname,
                        email: payload.email,
                        password: payload.password,
                        reEnterPassword: payload.password
                      }, _config.fieldsOptions);

                    case 5:
                      result = _context.sent;

                      if (!((typeof result === 'undefined' ? 'undefined' : (0, _typeof3.default)(result)) == 'object' && 'message' in result)) {
                        _context.next = 11;
                        break;
                      }

                      // Error try register again.
                      // Send message of error to the client.
                      console.error(result.message);
                      if (result.message === 'The input field email not valid' || result.message === 'The input field email is not a valid email') {
                        payloadResponse = { email: 'The email is not valid' };
                      } else if (result.message === 'The input field password not valid') {
                        payloadResponse = { password: 'The password is not valid' };
                      } else if (result.message === 'Email already used.') {
                        payloadResponse = { email: 'Please, choose another email.' };
                      }
                      // Send email error
                      ws.send({
                        type: _serverActions.ACTION,
                        action: _clientActions.ACCOUNT_REGISTER_ERROR,
                        payload: payloadResponse
                      });
                      return _context.abrupt('return', {
                        v: void 0
                      });

                    case 11:
                      // User registered!!
                      //
                      // To give websocket.accountCode the account email
                      // Register the websocket 'ws.accountCode' with the email.
                      // So we can identify the ws with the account email.
                      ws.accountCode = payload.email;

                      account = {
                        email: payload.email,
                        firstName: payload.firstName,
                        surname: payload.surname,
                        token: result,
                        ws: ws
                      };
                      reduxStoreServerAndClientRegisterAccountAndGoToWait(account);
                      // Ready to asign to a group
                      return _context.abrupt('return', {
                        v: true
                      });

                    case 15:
                      _context.next = 17;
                      return (0, _loginAccount.loginAccount)({
                        email: payload.email,
                        password: payload.password
                      });

                    case 17:
                      result = _context.sent;

                      console.log(result);

                      if (!((typeof result === 'undefined' ? 'undefined' : (0, _typeof3.default)(result)) == 'object' && 'message' in result)) {
                        _context.next = 24;
                        break;
                      }

                      // Error try login.
                      // Send message of error to the client.
                      console.error(result.message);
                      if (result.message === 'The input field email not valid' || result.message === 'The input field email is not a valid email') {
                        payloadResponse = { email: 'The email is not valid' };
                      } else if (result.message === 'Password not valid.') {
                        payloadResponse = { password: 'The password is not valid' };
                      } else if (result.message === 'Account Email not found.') {
                        payloadResponse = { email: 'Please, check email and password.' };
                      }
                      // Send email error
                      ws.send({
                        type: _serverActions.ACTION,
                        action: _clientActions.ACCOUNT_LOGIN_ERROR,
                        payload: payloadResponse
                      });
                      return _context.abrupt('return', {
                        v: void 0
                      });

                    case 24:
                      // Register the websocket 'ws.accountCode' with the email.
                      // So we can identify the ws with the account email.
                      ws.accountCode = payload.email;

                      account = {
                        email: payload.email,
                        firstName: result.firstName,
                        surname: result.surname,
                        token: result.token,
                        ws: ws
                      };

                      console.log('>>>>>state');
                      reduxStoreServerAndClientRegisterAccountAndGoToWait(account);
                      console.log('>>>>>state');
                      console.log(store.getState());
                      // console.log('send error login')
                      // console.log(ws.name +' '+ message.type + ' ' + message.payload.email)
                      return _context.abrupt('return', {
                        v: true
                      });

                    case 31:
                      store.dispatch((0, _actions.groupsAdd)({
                        groupId: payload.name || Date.now(),
                        type: payload.type || 0,
                        list: payload.list || []
                      }));
                      return _context.abrupt('return', {
                        v: true
                      });

                    case 33:
                      result = store.getState();
                      // console.log('>>>>> ' + GROUPS_REMOVE)
                      // console.log(payload)
                      // console.log(store.getState())
                      // console.log('result.accounts[accountId]> ')
                      // console.log(result.accounts[accountId])
                      // Free all the accounts from group
                      removeGroup(payload.groupId, store);
                      // result.groups[payload.groupId].map(
                      //   (accountId) => store.dispatch( accountsUpdate({ ...result.accounts[accountId], group: 'unassigned' }) )
                      // )
                      // store.dispatch( groupsRemove( payload.groupId ) )
                      return _context.abrupt('return', {
                        v: true
                      });

                    case 36:
                      return _context.abrupt('return', {
                        v: true
                      });

                    case 37:
                      return _context.abrupt('return', {
                        v: true
                      });

                    case 38:
                      result = store.getState();
                      payload.selected.map(function (accountId) {
                        addAccountToGroup(accountId, payload.groupId, store);
                      });
                      return _context.abrupt('return', {
                        v: true
                      });

                    case 41:
                      result = store.getState();
                      payload.selected.map(function (accountId) {
                        removeAccountFromGroup(accountId, store);
                      });
                      return _context.abrupt('return', {
                        v: true
                      });

                    case 44:
                      result = store.getState();
                      if (result.accounts[payload.accountId]) {
                        removeAccountFromGroup(payload.accountId, store);
                      }
                      return _context.abrupt('return', {
                        v: true
                      });

                    case 47:
                      result = store.getState();

                      // Correct the number of groups
                      while (payload.numberOfGroups != result.groups.list.length) {
                        if (payload.numberOfGroups > result.groups.list.length) {
                          // Add group
                          store.dispatch((0, _actions.groupsAdd)({
                            groupId: payload.name || Date.now(),
                            // Assign a type from 0 - 3
                            type: payload.type || result.groups.list.length % 4,
                            list: payload.list || []
                          }));
                        } else {
                          // Remove group
                          removeGroup(result.groups.list[result.groups.list.length - 1], store);
                        }
                      }

                      // reapeted from class GroupAutomatic

                      drawGroups = function drawGroups(g, a) {
                        var baseA = Math.floor(a / g);
                        var orderedGroupsAndAccounts = [];

                        for (var i = 0; i < g; i++) {
                          orderedGroupsAndAccounts.push(baseA);
                        }

                        for (var _i = 0; _i < a % g; _i++) {
                          orderedGroupsAndAccounts[_i] += 1;
                        }

                        return orderedGroupsAndAccounts;
                      };

                      orderedGroupsAndAccounts = drawGroups(payload.numberOfGroups, result.accounts.list.length);
                      accountId = void 0, group = void 0, groupId = void 0;
                      // Make the gropus random

                      random = true;

                      // remove accounts to excess groups

                      for (i = 0; i < payload.numberOfGroups; i++) {
                        group = result.groups[result.groups.list[i]];
                        while (group.accountList.length > orderedGroupsAndAccounts[i]) {
                          removeAccountFromGroup(
                          // last account of the group
                          group.accountList[group.accountList.length - 1], store);
                        }
                      }
                      // Add accounts to deficit groups
                      _i2 = 0;

                    case 55:
                      if (!(_i2 < payload.numberOfGroups)) {
                        _context.next = 116;
                        break;
                      }

                      groupId = result.groups.list[_i2];
                      group = result.groups[groupId];

                    case 58:
                      if (!(group.accountList.length < orderedGroupsAndAccounts[_i2])) {
                        _context.next = 113;
                        break;
                      }

                      if (!(random == true)) {
                        _context.next = 83;
                        break;
                      }

                      // Find a free accountId
                      accountId = [];
                      _iteratorNormalCompletion = true;
                      _didIteratorError = false;
                      _iteratorError = undefined;
                      _context.prev = 64;
                      for (_iterator = (0, _getIterator3.default)(result.accounts.list); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        acc = _step.value;

                        if (result.accounts[acc].group == 'unassigned') {
                          accountId.push(acc);
                        }
                      }

                      _context.next = 72;
                      break;

                    case 68:
                      _context.prev = 68;
                      _context.t1 = _context['catch'](64);
                      _didIteratorError = true;
                      _iteratorError = _context.t1;

                    case 72:
                      _context.prev = 72;
                      _context.prev = 73;

                      if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                      }

                    case 75:
                      _context.prev = 75;

                      if (!_didIteratorError) {
                        _context.next = 78;
                        break;
                      }

                      throw _iteratorError;

                    case 78:
                      return _context.finish(75);

                    case 79:
                      return _context.finish(72);

                    case 80:
                      addAccountToGroup(accountId[Math.floor(Math.random() * accountId.length)], groupId, store);
                      _context.next = 111;
                      break;

                    case 83:
                      // Find a free accountId
                      _iteratorNormalCompletion2 = true;
                      _didIteratorError2 = false;
                      _iteratorError2 = undefined;
                      _context.prev = 86;
                      _iterator2 = (0, _getIterator3.default)(result.accounts.list);

                    case 88:
                      if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        _context.next = 96;
                        break;
                      }

                      _acc = _step2.value;

                      if (!(result.accounts[_acc].group == 'unassigned')) {
                        _context.next = 93;
                        break;
                      }

                      accountId = _acc;
                      return _context.abrupt('break', 96);

                    case 93:
                      _iteratorNormalCompletion2 = true;
                      _context.next = 88;
                      break;

                    case 96:
                      _context.next = 102;
                      break;

                    case 98:
                      _context.prev = 98;
                      _context.t2 = _context['catch'](86);
                      _didIteratorError2 = true;
                      _iteratorError2 = _context.t2;

                    case 102:
                      _context.prev = 102;
                      _context.prev = 103;

                      if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                      }

                    case 105:
                      _context.prev = 105;

                      if (!_didIteratorError2) {
                        _context.next = 108;
                        break;
                      }

                      throw _iteratorError2;

                    case 108:
                      return _context.finish(105);

                    case 109:
                      return _context.finish(102);

                    case 110:

                      addAccountToGroup(accountId, groupId, store);

                    case 111:
                      _context.next = 58;
                      break;

                    case 113:
                      _i2++;
                      _context.next = 55;
                      break;

                    case 116:
                      return _context.abrupt('return', {
                        v: true
                      });

                    case 117:
                      if ((typeof payload === 'undefined' ? 'undefined' : (0, _typeof3.default)(payload)) == 'object' && payload.constructor.name == 'Array') {
                        payload.forEach(function (accountId) {
                          return nextStep(accountId);
                        });
                      }
                      return _context.abrupt('return', {
                        v: true
                      });

                    case 119:
                      if (!((typeof payload === 'undefined' ? 'undefined' : (0, _typeof3.default)(payload)) != 'object' || !payload.accountId || payload.accountId == 'unassigned')) {
                        _context.next = 122;
                        break;
                      }

                      console.log('SUBMIT_SURVEY_INFO: No valid accountId');
                      return _context.abrupt('return', {
                        v: false
                      });

                    case 122:
                      temp = {};
                      result = store.getState();
                      temp.accountSurveyPointer = result.accounts[payload.accountId].surveyPointer;
                      // Add survey info to the redux store and to the database.
                      store.dispatch((0, _actions.storeSurveInfo)((0, _extends3.default)({}, payload, {
                        surveyId: temp.accountSurveyPointer,
                        surveyType: result.session.surveyPath[temp.accountSurveyPointer].type,
                        groupId: result.accounts[payload.accountId].group
                      })));

                      // After that move to the next survey step.
                      nextStep(payload.accountId);

                      result = store.getState();

                      temp.numActiveAccounts = result.groups.list.reduce(function (prev, groupID) {
                        return prev + result.groups[groupID].accountList.length;
                      }, 0);

                      temp.numActualSurveysRecived = result.results.surveyInfo.reduce(function (prev, survey) {
                        if (survey.surveyId == temp.accountSurveyPointer) {
                          return prev + 1;
                        }
                        return prev;
                      }, 0);

                      // If information need processing after the last account have being submited:
                      // EX: SIMILARITIES, FAVOURITES & RESULTS

                      if (!(temp.numActiveAccounts > 0 && temp.numActiveAccounts == temp.numActualSurveysRecived)) {
                        _context.next = 172;
                        break;
                      }

                      _context.t3 = result.session.surveyPath[temp.accountSurveyPointer].type;
                      _context.next = _context.t3 === _surveyTypes.SIMILARITIES ? 134 : _context.t3 === _surveyTypes.FAVOURITES ? 138 : _context.t3 === _surveyTypes.RESULTS ? 170 : 172;
                      break;

                    case 134:
                      // Get the all SIMILARITIES survey results.
                      temp.dataSimilarities = result.results.surveyInfo.filter(function (element) {
                        return element.surveyId == temp.accountSurveyPointer;
                      });
                      temp.dataSimilarities = temp.dataSimilarities.reduce(function (prev, survey) {
                        return prev = [].concat((0, _toConsumableArray3.default)(prev), (0, _toConsumableArray3.default)(survey.surveyData));
                      }, []);
                      // Process SIMILARITIES and store in task.similarList
                      store.dispatch((0, _actions.taskAddAllSimilarities)((0, _similarity2.default)(temp.dataSimilarities)));
                      return _context.abrupt('break', 172);

                    case 138:
                      // Process the FAVOURITES
                      console.log('FAVOURITES PRIMEro ANTES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> processSimilarities <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
                      _context.prev = 139;

                      temp.dataFavourites = result.results.surveyInfo.filter(function (element) {
                        return element.surveyId == temp.accountSurveyPointer;
                      });

                      temp.dataFavourites = temp.dataFavourites.reduce(function (prev, survey) {
                        return prev = [].concat((0, _toConsumableArray3.default)(prev), (0, _toConsumableArray3.default)(survey.surveyData.data));
                      }, []);

                      console.log("ESTODEAKI: " + (0, _stringify2.default)(temp.dataFavourites));
                      aggregated = [];
                      _context.t4 = _regenerator2.default.keys(temp.dataFavourites);

                    case 145:
                      if ((_context.t5 = _context.t4()).done) {
                        _context.next = 160;
                        break;
                      }

                      f = _context.t5.value;

                      found = false;

                      _context.t6 = _regenerator2.default.keys(aggregated);

                    case 149:
                      if ((_context.t7 = _context.t6()).done) {
                        _context.next = 157;
                        break;
                      }

                      e = _context.t7.value;

                      if (!(temp.dataFavourites[f].id == aggregated[e].id)) {
                        _context.next = 155;
                        break;
                      }

                      aggregated[e].rating.push(temp.dataFavourites[f].rating);
                      found = true;
                      return _context.abrupt('break', 157);

                    case 155:
                      _context.next = 149;
                      break;

                    case 157:

                      if (!found) {
                        entry = temp.dataFavourites[f];
                        if (entry.rating) {
                          if (!(entry.rating instanceof Array)) {
                            entry.rating = [entry.rating];
                          }
                        } else {
                          entry.rating = [];
                        }
                        aggregated.push(entry);
                      }

                      _context.next = 145;
                      break;

                    case 160:
                      _context.next = 165;
                      break;

                    case 162:
                      _context.prev = 162;
                      _context.t8 = _context['catch'](139);

                      console.log(_context.t8);

                    case 165:
                      console.log('FAVOURITES PRIMEro>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> processSimilarities <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
                      console.log("DATOS::::::> " + (0, _stringify2.default)(aggregated));
                      //console.log( processSimilarities( temp.dataSimilarities ) )
                      console.log('FAVOURITES SEGUNDO>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> processSimilarities <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
                      store.dispatch((0, _actions.taskAddAllFavourites)(aggregated));
                      return _context.abrupt('break', 172);

                    case 170:

                      store.dispatch((0, _actions.taskIncreasePointer)());
                      return _context.abrupt('break', 172);

                    case 172:
                      return _context.abrupt('return', {
                        v: true
                      });

                    case 173:
                      result = store.getState();
                      temp.creator = result.accounts[payload.creator];

                      store.dispatch((0, _actions.taskIdeaAdd)((0, _extends3.default)({
                        group: result.accounts[payload.creator].group,
                        groupType: result.groups[result.accounts[payload.creator].group].type,
                        firstName: temp.creator.firstName,
                        surname: temp.creator.surname
                      }, payload)));

                      return _context.abrupt('return', {
                        v: true
                      });

                    case 177:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, _this, [[64, 68, 72, 80], [73,, 75, 79], [86, 98, 102, 110], [103,, 105, 109], [139, 162]]);
            })(), 't0', 7);

          case 7:
            _ret = _context2.t0;

            if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt('return', _ret.v);

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function mutate(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return mutate;
}();

// Get an url from an survey-type


// Redux client actions
//# sourceMappingURL=server-mutate.js.map

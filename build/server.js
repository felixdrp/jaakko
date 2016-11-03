'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _websocketSimple = require('./websocket-message/websocket-simple');

var _websocketSimple2 = _interopRequireDefault(_websocketSimple);

var _serverMutate = require('./websocket-message/server-mutate');

var _serverMutate2 = _interopRequireDefault(_serverMutate);

var _serverQuery = require('./websocket-message/server-query');

var _serverQuery2 = _interopRequireDefault(_serverQuery);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _server = require('./reducers/server');

var _actions = require('./actions/actions');

var _serverActions = require('./websocket-message/server-actions');

var _config = require('./config');

var _sessionData = require('./session-data');

var _sessionData2 = _interopRequireDefault(_sessionData);

var _data_oct_ = require('../data_oct_26.json');

var _data_oct_2 = _interopRequireDefault(_data_oct_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var privateKey = fs.readFileSync(__dirname + '/../sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync(__dirname + '/../sslcert/cert.pem', 'utf8');

var https = require('https');
var credentials = { key: privateKey, cert: certificate };

var WebSocketServer = require('ws').Server;


var express = require('express');
var compression = require('compression');
var app = express();
app.use(compression());







var webTemplate = require('../web-template');

var portWeb = parseInt(process.env.PORT_WEB) || _config.port;
var portSocket = parseInt(process.env.PORT_SOCKET) || '3000';

var webServer = https.createServer(credentials, app);

var appWSAdmin = https.createServer({
  key: privateKey,
  cert: certificate
}, function (req, res) {
  res.writeHead(200);
  res.end("All glory to WebSockets!\n");
}).listen(portWeb + 1);

var wss = new WebSocketServer({ server: webServer });
var wssAdmin = new WebSocketServer({ server: appWSAdmin });
app.use(express.static('public'));

app.use('/', function (req, res) {
  res.send(webTemplate());
});

webServer.listen(portWeb, function () {
  return console.log('server running at https://localhost:' + portWeb);
});

var stream = fs.createWriteStream('resultsBackup.txt', { flags: 'w', autoClose: true });

var updateControlRooms = function updateControlRooms(store) {
  return function (next) {
    return function (action) {
      var vervose = true;

      if (vervose) {
        console.log('dispatching', action);
      }

      var result = next(action);
      var payload = (0, _actions.storeStateWithoutWebSocket)(store.getState());

      if (vervose) {
        console.log('MEMORY USAGE state' + (0, _stringify2.default)(process.memoryUsage()));
        console.log((0, _stringify2.default)(store.getState().task, null, 4));
      }

      if (action.type == _actions.STORE_SURVEY_INFO) {
        stream.write((0, _stringify2.default)(payload) + "\n");
      }

      if (action.type == _actions.TASK_ADD_IDEA) {
        try {
          new _promise2.default(function (resolve, reject) {
            var accountGroup = action.payload.group;
            store.getState().groups[accountGroup].accountList.forEach(function (client) {
              var state = store.getState();

              if (state.accounts[client].ws != undefined) {
                state.accounts[client].ws.send((0, _serverActions.wsTaskUpdateGroupIdeas)(state.task.taskList[state.task.taskPointer].filter(
                function (element) {
                  return state.accounts[client].group == element.group;
                })));
              }

              console.log('send to group friends > ' + client);
            });
            resolve('transfer OK');
          });
        } catch (e) {
          console.log(e);
        }
      }

      new _promise2.default(function (resolve, reject) {
        wssAdmin.clients.forEach(function (wsControlRoom) {
          if (wsControlRoom.readyState != 1) {
            return;
          }
          try {
            wsControlRoom.send((0, _stringify2.default)((0, _serverActions.swUpdateControlRoom)(payload)));

            resolve('transfer OK');
          } catch (err) {
            reject(err);
          }
        });
      });

      return result;
    };
  };
};

var store = (0, _redux.createStore)((0, _redux.combineReducers)({
  accounts: _server.accounts,
  groups: _server.groups,
  session: _server.session,
  results: _server.results,
  task: _server.task
}), _data_oct_2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default, updateControlRooms));

store.dispatch((0, _actions.sessionDataAdd)(_sessionData2.default));

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function (client) {
    if (client.readyState != 1) {
      console.log('socket on state: ' + client.readyState + ' prevented send');
      return;
    }
    console.log('wss.clients length: ' + wss.clients.length);
    console.log('message sent to: ' + client.accountCode);
    client.send(data);
  });
};


var websocketManager = function websocketManager(ws) {
  var name = 'temporal';
  console.log('started websocket client' + name);
  ws.name = name;
  ws.accountCode = Date.now();



  ws.send('Welcome!');

  ws.on('close', function () {
    console.log('stopping websocket client ' + ws.accountCode);

  });

  var ii = 0;
  ws.onmessage = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(event) {
      var message;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              message = void 0;

              if (!/^\{.*\}$/.test(event.data)) {
                _context.next = 5;
                break;
              }

              message = JSON.parse(event.data);
              _context.next = 7;
              break;

            case 5:
              console.log('No protocol>>String>>>' + event.data);
              return _context.abrupt('return');

            case 7:
              console.log('>>>' + (0, _stringify2.default)(event.data));

              if (!(typeof message == 'string')) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return');

            case 10:
              _context.t0 = message.type;
              _context.next = _context.t0 === 'MUTATE' ? 13 : _context.t0 === 'QUERY' ? 16 : 22;
              break;

            case 13:
              _context.next = 15;
              return (0, _serverMutate2.default)({
                action: message.action || '',
                payload: message.payload || '',
                ws: new _websocketSimple2.default(ws),
                store: store
              }, wss);

            case 15:
              return _context.abrupt('break', 23);

            case 16:
              _context.next = 18;
              return (0, _serverQuery2.default)({
                action: message.action || '',
                payload: message.payload || '',
                ws: new _websocketSimple2.default(ws),
                store: store
              });

            case 18:
              console.log('Query to the server');
              console.log(message.type);
              console.log(message);
              return _context.abrupt('break', 23);

            case 22:
              store.dispatch(message.payload);

            case 23:
              console.log('ws.readyState>>>' + ws.readyState + ' < ID < ' + ws.accountCode);

            case 24:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

wss.on('connection', function (ws) {
  return websocketManager(ws);
});
wssAdmin.on('connection', function (ws) {
  return websocketManager(ws);
});
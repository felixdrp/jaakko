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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Usando servidor seguro:
// https://localhost:8000/
// Open a websocket on the browser:
// var exweb = new WebSocket("wss://localhost:8008")
// Imprimir mensajes del servidor:
// exweb.onmessage = (a) => console.log(a)
var fs = require('fs');
var privateKey = fs.readFileSync(__dirname + '/../sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync(__dirname + '/../sslcert/cert.pem', 'utf8');

var https = require('https');
var credentials = { key: privateKey, cert: certificate };

var WebSocketServer = require('ws').Server;


var express = require('express');
var compression = require('compression');
var app = express();
// compress all requests
app.use(compression());

// function that process the messages of type mutate.


// Redux


var webTemplate = require('../web-template');

var portWeb = parseInt(process.env.PORT_WEB) || _config.port;
var portSocket = parseInt(process.env.PORT_SOCKET) || '3000';

// Create the web server linked with the express app
var webServer = https.createServer(credentials, app);

// Web server for websocket Admin connections
var appWSAdmin = https.createServer({
  // providing server with  SSL key/cert
  key: privateKey,
  cert: certificate
}, function (req, res) {
  res.writeHead(200);
  res.end("All glory to WebSockets!\n");
}).listen(portWeb + 1);

// Link the web server port to the socket server port
var wss = new WebSocketServer({ server: webServer });
var wssAdmin = new WebSocketServer({ server: appWSAdmin });
// debugger
app.use(express.static('public'));

app.use('/', function (req, res) {
  res.send(webTemplate());
});

webServer.listen(portWeb, function () {
  return console.log('server running at https://localhost:' + portWeb);
});
// File to maintain a hard copy of the state
var stream = fs.createWriteStream('resultsBackup.txt', { flags: 'w', autoClose: true });
// middleware to send store updates to the admins
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
        // console.log('UPDATE ControlRoom state' + payload )
        console.log('MEMORY USAGE state' + (0, _stringify2.default)(process.memoryUsage()));
        console.log((0, _stringify2.default)(store.getState().task, null, 4));
        // console.log('wssAdmin.clients.length> ' + wssAdmin.clients.length )
      }

      if (action.type == _actions.STORE_SURVEY_INFO) {
        // Write state to a file only when STORE_SURVEY_INFO action
        stream.write((0, _stringify2.default)(payload) + "\n");
      }

      // If new idea added transmit to the same group
      if (action.type == _actions.TASK_ADD_IDEA) {
        store.getState().groups[action.payload.group].accountList.forEach(function (client) {
          var state = store.getState();
          state.accounts[client].ws.send((0, _serverActions.wsTaskUpdateGroupIdeas)(state.task.taskList[state.task.taskPointer].filter(function (element) {
            return state.accounts[client].group == element.group;
          })));
          console.log('send to group friends > ' + client);
        });
      }

      // transfer asynchronously to all the admins
      new _promise2.default(function (resolve, reject) {
        wssAdmin.clients.forEach(function (wsControlRoom) {
          // console.log('UPDATE ControlRoom state (promise) >' + payload)
          // console.log('Stado del socket>> >' + wsControlRoom.readyState + ' < ID < ' + wsControlRoom.accountCode)
          if (wsControlRoom.readyState != 1) {
            return;
          }
          try {
            wsControlRoom.send((0, _stringify2.default)((0, _serverActions.swUpdateControlRoom)(payload)));
            // console.log('Stado del socket>> >' + wsControlRoom.readyState + ' < ID < ' + wsControlRoom.accountCode)

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

// Note: this API requires redux@>=3.1.0
// Create Redux store
var store = (0, _redux.createStore)((0, _redux.combineReducers)({
  accounts: _server.accounts,
  groups: _server.groups,
  // Session survey questions
  session: _server.session,
  // Results to the surveys
  results: _server.results,
  task: _server.task
}), (0, _redux.applyMiddleware)(_reduxThunk2.default, updateControlRooms));

// Add the survey questions data to the redux store
store.dispatch((0, _actions.sessionDataAdd)(_sessionData2.default));
// console.log('~~~~ session estas ahi?')
// console.log(store.getState())

wss.broadcast = function broadcast(data) {
  // debugger
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
//
// setInterval( () => wss.broadcast('mensaje importante de '), 2000 )
// setTimeout( () => {
// // setInterval( () => {
// debugger
// console.log('broadcast')
// wss.broadcast(
//   JSON.stringify(
//     { type: 'ACTION', action: 'ACCOUNT_REGISTER_ERROR', payload: 'cagada' }
//   )
// )
// }, 8000)


var websocketManager = function websocketManager(ws) {
  var name = 'temporal';
  console.log('started websocket client' + name);
  // When user login will be the email
  ws.name = name;
  ws.accountCode = Date.now();

  // Add the Websocket to the list
  // queryWebSocketList.push(ws);

  // console.log('wsocket list length: ' + queryWebSocketList.length);

  ws.send('Welcome!');

  ws.on('close', function () {
    console.log('stopping websocket client ' + ws.accountCode);
    //  console.log('yo soy tu padre!!!!>>>  ' + parent.clients);

    // Remove from
    // console.log(queryWebSocketList.indexOf(ws));
    // // Remove Websocket from queryWebSocketList
    // queryWebSocketList.splice(queryWebSocketList.indexOf(ws), 1);
    // console.log(ws.readyState);
    // console.log('wsocket list length: ' + queryWebSocketList.length);
  });

  var ii = 0;
  ws.onmessage = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(event) {
      var message;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Check the query.
              // Process action.
              // debugger
              message = void 0;
              // Check it is a JSON response

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
              // console.log( '>>>' + Object.keys(event) )

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
              // dispatch 'ACTIONS'
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

// wss.on('connection', (ws) => websocketManager(ws));
wss.on('connection', function (ws) {
  return websocketManager(ws);
});
wssAdmin.on('connection', function (ws) {
  return websocketManager(ws);
});
//# sourceMappingURL=server.js.map

'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _websocketSimple = require('./websocket-message/websocket-simple');

var _websocketSimple2 = _interopRequireDefault(_websocketSimple);

var _serverMutate = require('./websocket-message/server-mutate');

var _serverMutate2 = _interopRequireDefault(_serverMutate);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _server = require('./reducers/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [nameMe].map(_regenerator2.default.mark);

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


// Note: this API requires redux@>=3.1.0
var store = (0, _redux.createStore)((0, _redux.combineReducers)({
  accounts: _server.accounts,
  groups: _server.groups
}), (0, _redux.applyMiddleware)(_reduxThunk2.default));

var webTemplate = require('../web-template');

var portWeb = parseInt(process.env.PORT_WEB) || '8008';
var portSocket = parseInt(process.env.PORT_SOCKET) || '3000';

// Create the web server linked with the express app
var webServer = https.createServer(credentials, app);

// Link the web server port to the socket server port
var wss = new WebSocketServer({ server: webServer });

app.use(express.static('public'));

app.use('/', function (req, res) {
  res.send(webTemplate());
});

webServer.listen(portWeb, function () {
  return console.log('server running at https://localhost:' + portWeb);
});

wss.broadcast = function broadcast(data) {
  // debugger
  wss.clients.forEach(function each(client) {
    console.log('wss.clients length: ' + wss.clients.length);
    console.log('message sent to: ' + client.nombre);
    client.send(data);
  });
};
//
// setInterval( () => wss.broadcast('mensaje importante de '), 2000 )
// setTimeout( () => {
// setInterval( () => {
// console.log('broadcast')
// wss.broadcast(
//   JSON.stringify(
//     { type: 'ACTION', action: 'ACCOUNT_REGISTER_ERROR', payload: 'cagada' }
//   )
// )
// }, 3000)

function nameMe() {
  return _regenerator2.default.wrap(function nameMe$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.delegateYield(['maria', 'jose', 'jesus', 'burro', 'angel'], 't0', 1);

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
var nameMeIterator = nameMe();

wss.on('connection', function (ws) {
  var name = nameMeIterator.next().value;
  console.log('started websocket client' + name);
  // When user login will be the email
  ws.name = name;
  ws.accountCode = null;

  // Add the Websocket to the list
  // queryWebSocketList.push(ws);

  // console.log('wsocket list length: ' + queryWebSocketList.length);

  ws.send('Welcome!');

  ws.on('close', function () {
    console.log('stopping websocket client ' + ws.accountCode);
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
      return _regenerator2.default.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // Check the query.
              // Process action.
              // debugger
              message = void 0;
              // Check it is a JSON response

              if (!/^\{.*\}$/.test(event.data)) {
                _context2.next = 5;
                break;
              }

              message = JSON.parse(event.data);
              _context2.next = 7;
              break;

            case 5:
              console.log('No protocol>>String>>>' + event.data);
              return _context2.abrupt('return');

            case 7:
              console.log('>>>' + (0, _stringify2.default)(event.data));
              // console.log( '>>>' + Object.keys(event) )

              if (!(typeof message == 'string')) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt('return');

            case 10:
              _context2.t0 = message.type;
              _context2.next = _context2.t0 === 'MUTATE' ? 13 : _context2.t0 === 'QUERY' ? 16 : 18;
              break;

            case 13:
              _context2.next = 15;
              return (0, _serverMutate2.default)({
                action: message.action || '',
                payload: message.payload || '',
                ws: new _websocketSimple2.default(ws),
                store: store
              });

            case 15:
              return _context2.abrupt('break', 19);

            case 16:
              console.log(message.type + ' ' + message.payload.email);
              return _context2.abrupt('break', 19);

            case 18:
              // dispatch 'ACTIONS'
              store.dispatch(message.payload);

            case 19:
              console.log('ws.readyState>>>' + ws.readyState);

            case 20:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
});
//# sourceMappingURL=server.js.map

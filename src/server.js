// Usando servidor seguro:
// https://localhost:8000/
// Open a websocket on the browser:
// var exweb = new WebSocket("wss://localhost:8008")
// Imprimir mensajes del servidor:
// exweb.onmessage = (a) => console.log(a)
var fs = require('fs');
var privateKey  = fs.readFileSync(__dirname + '/../sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync(__dirname + '/../sslcert/cert.pem', 'utf8');

var https = require('https');
var credentials = {key: privateKey, cert: certificate};

var WebSocketServer = require('ws').Server;
import WebSocketSimple from './websocket-message/websocket-simple'

var express = require('express')
var compression = require('compression')
var app = express()
// compress all requests
app.use(compression())

// function that process the messages of type mutate.
import mutate from './websocket-message/server-mutate'

// Redux
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  accounts,
  groups,
} from './reducers/server';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  combineReducers({
    accounts,
    groups,
  }),
  applyMiddleware(thunk)
);

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

webServer.listen( portWeb, () => console.log('server running at https://localhost:' + portWeb) );

wss.broadcast = function broadcast(data) {
  // debugger
  wss.clients.forEach(function each(client) {
    console.log('wss.clients length: ' + wss.clients.length)
    console.log('message sent to: ' + client.nombre)
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

function* nameMe() {
  yield* [
    'maria',
    'jose',
    'jesus',
    'burro',
    'angel'
  ];
}
var nameMeIterator = nameMe()

wss.on('connection', function (ws) {
    let name = nameMeIterator.next().value
    console.log('started websocket client' + name);
    // When user login will be the email
    ws.name = name
    ws.accountCode = null

    // Add the Websocket to the list
    // queryWebSocketList.push(ws);

    // console.log('wsocket list length: ' + queryWebSocketList.length);

    ws.send('Welcome!');

    ws.on('close', () => {
	     console.log('stopping websocket client ' + ws.accountCode);
       // Remove from
	// console.log(queryWebSocketList.indexOf(ws));
	// // Remove Websocket from queryWebSocketList
	// queryWebSocketList.splice(queryWebSocketList.indexOf(ws), 1);
	// console.log(ws.readyState);
	// console.log('wsocket list length: ' + queryWebSocketList.length);
    } );

    let ii = 0
    ws.onmessage = async function(event) {
    	// Check the query.
    	// Process action.
      // debugger
      let message
      // Check it is a JSON response
      if ( /^\{.*\}$/.test(event.data) ) {
        message = JSON.parse(event.data)
      } else {
        console.log( 'No protocol>>String>>>' + event.data )
        return
      }
      console.log( '>>>' + JSON.stringify(event.data) )
      // console.log( '>>>' + Object.keys(event) )
      if (typeof message == 'string') return

  	  switch ( message.type ) {
        // Process message of type MUTATE
        case 'MUTATE':
          await mutate({
            action: message.action || '',
            payload: message.payload || '',
            ws: new WebSocketSimple(ws),
            store
          })
          break;
        // Process message of type QUERY
        case 'QUERY':
          console.log(message.type + ' ' + message.payload.email)
          break;
        // Process message of type ACTIONS
        default:
          // dispatch 'ACTIONS'
          store.dispatch(message.payload)
      }
      console.log( 'ws.readyState>>>' + ws.readyState )

    }
});

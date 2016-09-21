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
import query from './websocket-message/server-query'

// Redux
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  accounts,
  groups,
  session,
  results,
} from './reducers/server';

import {
  // Remove the WS from a store state
  storeStateWithoutWebSocket,
  sessionDataAdd,
} from './actions/actions'

import {
  swUpdateControlRoom,
} from './websocket-message/server-actions'

import { port } from './config'

import sessionData from './session-data'

var webTemplate = require('../web-template');

var portWeb = parseInt(process.env.PORT_WEB) || port;
var portSocket = parseInt(process.env.PORT_SOCKET) || '3000';

// Create the web server linked with the express app
var webServer = https.createServer(credentials, app);

// Web server for websocket Admin connections
var appWSAdmin = https.createServer(
  {
    // providing server with  SSL key/cert
    key: privateKey,
    cert: certificate
  },
  ( req, res ) => {
    res.writeHead(200);
    res.end("All glory to WebSockets!\n");
  }
).listen( portWeb + 1 );

// Link the web server port to the socket server port
var wss = new WebSocketServer({ server: webServer });
var wssAdmin = new WebSocketServer({ server: appWSAdmin });
// debugger
app.use(express.static('public'));

app.use('/', function (req, res) {
  res.send(webTemplate());
});

webServer.listen( portWeb, () => console.log('server running at https://localhost:' + portWeb) );


// middleware to send store updates to the admins
const updateControlRooms = store => next => action => {
  let vervose = true

  if (vervose) {
    console.log('dispatching', action)
  }

  let result = next(action)
  let payload = storeStateWithoutWebSocket( store.getState() )

  if (vervose) {
    // console.log('UPDATE ControlRoom state' + payload )
    console.log('MEMORY USAGE state' + JSON.stringify(process.memoryUsage()) )
    // console.log('wssAdmin.clients.length> ' + wssAdmin.clients.length )
  }

  // transfer asynchronously
  new Promise((resolve, reject) => {
    wssAdmin.clients.forEach( (wsControlRoom) => {
      // console.log('UPDATE ControlRoom state (promise) >' + payload)
      // console.log('Stado del socket>> >' + wsControlRoom.readyState + ' < ID < ' + wsControlRoom.accountCode)
      if (wsControlRoom.readyState != 1) {
        return
      }
      try {
        wsControlRoom.send(
          JSON.stringify( swUpdateControlRoom( payload ) )
        );
        // console.log('Stado del socket>> >' + wsControlRoom.readyState + ' < ID < ' + wsControlRoom.accountCode)

        resolve('transfer OK')
      } catch(err) {
        reject(err)
      }
    });
  })

  return result
}

// Note: this API requires redux@>=3.1.0
// Create Redux store
const store = createStore(
  combineReducers({
    accounts,
    groups,
    // Session survey questions
    session,
    // Results to the surveys
    results,
  }),
  applyMiddleware(
    thunk,
    updateControlRooms
  )
);

// Add the survey questions data to the redux store
store.dispatch( sessionDataAdd(sessionData) )
// console.log('~~~~ session estas ahi?')
// console.log(store.getState())

wss.broadcast = function broadcast(data) {
  // debugger
  wss.clients.forEach( (client) => {
    if (client.readyState != 1) {
      console.log('socket on state: ' + client.readyState + ' prevented send')
      return
    }
    console.log('wss.clients length: ' + wss.clients.length)
    console.log('message sent to: ' + client.accountCode)
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


var websocketManager = function (ws) {
    let name = 'temporal'
    console.log('started websocket client' + name);
    // When user login will be the email
    ws.name = name
    ws.accountCode = Date.now()


    // Add the Websocket to the list
    // queryWebSocketList.push(ws);

    // console.log('wsocket list length: ' + queryWebSocketList.length);

    ws.send('Welcome!');

    ws.on('close', () => {
     console.log('stopping websocket client ' + ws.accountCode);
    //  console.log('yo soy tu padre!!!!>>>  ' + parent.clients);

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
          await mutate(
            {
              action: message.action || '',
              payload: message.payload || '',
              ws: new WebSocketSimple(ws),
              store,
            },
            wss
          )
          break;
        // Process message of type QUERY
        case 'QUERY':
          await query({
            action: message.action || '',
            payload: message.payload || '',
            ws: new WebSocketSimple(ws),
            store
          })
          console.log('Query to the server')
          console.log(message.type)
          console.log(message)
          break;
        // Process message of type ACTIONS
        default:
          // dispatch 'ACTIONS'
          store.dispatch(message.payload)
      }
      console.log( 'ws.readyState>>>' + ws.readyState + ' < ID < ' + ws.accountCode )

    }
}

// wss.on('connection', (ws) => websocketManager(ws));
wss.on('connection', (ws) => websocketManager(ws) );
wssAdmin.on('connection', (ws) => websocketManager(ws) );

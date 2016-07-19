// Usando servidor seguro:
// https://localhost:8000/
// Open a websocket on the browser:
// var exweb = new WebSocket("wss://localhost:8008")
// Imprimir mensajes del servidor:
// exweb.onmessage = (a) => console.log(a)

var fs = require('fs');
var privateKey  = fs.readFileSync('sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');

var https = require('https');
var credentials = {key: privateKey, cert: certificate};

var WebSocketServer = require('ws').Server;
var express = require('express')
var app = express()
var webTemplate = require('./web-template');

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
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

setInterval( () => wss.broadcast('mensaje importante'), 500 )


wss.on('connection', function (ws) {

    console.log('started websocket client');

    // Add the Websocket to the list
    // queryWebSocketList.push(ws);

    // console.log('wsocket list length: ' + queryWebSocketList.length);

    ws.send('something');

    ws.on('close', function () {
	console.log('stopping websocket client');
	// console.log(queryWebSocketList.indexOf(ws));
	// // Remove Websocket from queryWebSocketList
	// queryWebSocketList.splice(queryWebSocketList.indexOf(ws), 1);
	// console.log(ws.readyState);
	// console.log('wsocket list length: ' + queryWebSocketList.length);
    }.bind(ws));

    ws.onmessage = function (event) {
	// Check the query.
/*
	var query = /sensor\/(\d+)\/(humidity|temperature)\/(lastMeasure|hour|day)?\/?/g.exec(event.data);
	if (query != null && query.length >= 3) {
console.log(query[0]);
	    DBQuery.lastHour(query[1], query[2])
		.then(function (data) {
		    var addPeriod = JSON.parse(data);
		    addPeriod["period"] = query[3];
		    ws.send(JSON.stringify(addPeriod));
		}, function (error) { console.error(error); });
	}
*/

// 	DBQuery.lastHourAllSensors()
//             .then(
// 		function (data) {
// //		    console.log('muesta los datos');
// //		    console.log(data);
// 		    var dataJson = JSON.parse(data);
// 		    ws.send(JSON.stringify(dataJson));
// 		    console.log('Data sent to the client by the websocket');
// 		},
// 		function (error) { console.error(error); }
// 	    );

    };
});

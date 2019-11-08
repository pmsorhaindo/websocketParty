const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws, req) {
  const ip = req.connection.remoteAddress;
  ws.on('message', function incoming(message) {
    console.log('received: %s from ip %s', message, ip);
  });

  ws.send('response!');
});

console.log('Server up and running on port: 8080');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws, req) {
  const ip = req.connection.remoteAddress;
  ws.on('message', function incoming(message) {
    if (message === 'initiating!') console.log('received client initiation request');
    console.log('received: %s', message);

    setTimeout(() => ws.send(`val: ${Math.random()}`), 2000);
  });


});

console.log('Server up and running on port: 8080');
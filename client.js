const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080/test');

ws.on('open', function open() {
  ws.send('testing!');
});

ws.on('message', function incoming(data) {
  console.log(data);
});
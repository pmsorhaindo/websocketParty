const WebSocket = require('ws');
const split = require('split');

const ws = new WebSocket('ws://localhost:8080/test');

ws.on('open', function open() {
  ws.send('initiating!');
});

ws.on('message', function incoming(data) {
  console.log(`server said: ${data}`);
  setTimeout(() => ws.send(`val: ${Math.random()}`), 2000);
});

process.stdin.pipe(split()).on('data', (msg) => ws.send(msg));

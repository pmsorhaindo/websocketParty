const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const clients = {};

const generateNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateId = () => {
  const MINIMUM_CLIENT_ID = 10000;
  const MAXIMUM_CLIENT_ID = 99999;
  return generateNumberBetween(MINIMUM_CLIENT_ID, MAXIMUM_CLIENT_ID);
}

const generateColor = () => {
  const colorVal = () => generateNumberBetween(0,255);
  return `rgb(${colorVal()}, ${ colorVal()}, ${colorVal()})`;
}

const generateInitialClient = (id) => ({
  id,
  color: generateColor(),
  position: {
    x: 0,
    y: 0,
  },
});

const generateNewClientId = () => {
  let id = generateId();
  if (Object.keys(clients).includes(id)) return generateNewClientId();
  clients[id] = generateInitialClient(id);
  return id;
}

wss.on('connection', function connection(ws, req) {
  const clientId = generateNewClientId();
  ws.on('message', function incoming(message) {
    console.log('received:', message, clientId);

    setTimeout(() => ws.send(JSON.stringify(clients)), 2000);
  });
});

console.log('Server up and running on port: 8080');
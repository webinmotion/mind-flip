const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 3030, path: '/play' });

wss.on('connection', function connection(ws) {

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('server received: %s', data);
  });

  ws.send('something from server');
});
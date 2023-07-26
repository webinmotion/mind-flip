module.exports = function (server) {

    /**
     * Module dependencies.
     */

    var { WebSocketServer } = require('ws');
    var querystring = require("querystring");

    /**
     * Create websocket server
     */

    var wss = new WebSocketServer({ noServer: true, path: '/play', clientTracking: true });

    /**
     * Client authentication
     */

    function onSocketError(err) {
        console.error(err);
    }

    const pingInterval = 30000;

    function authenticateClient(request, onCompleted) {
        var { ticket } = querystring.parse(request.url.replace(/.*?\?/, ""));
        //validate the ticket (if necessary) before proceeding
        onCompleted(null, ticket)
    }

    server.on('upgrade', function upgrade(request, socket, head) {
        socket.on('error', onSocketError);

        // custom authentication function
        authenticateClient(request, (err, ticket) => {
            if (err || !ticket) {
                socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                socket.destroy();
                return;
            }

            socket.removeListener('error', onSocketError);

            wss.handleUpgrade(request, socket, head, function done(ws) {
                wss.emit('connection', ws, request, ticket);
            });
        });
    });

    /**
     * Configure websocket callbacks
     */

    wss.on('connection', function connection(ws, request, ticket) {

        console.log('connection request:', request.url);
        console.log('connection ticket:', ticket);

        ws.isAlive = true;
        ws.on('error', console.error);
        ws.on('pong', heartbeat);

        ws.on('message', function message(data) {
            console.log('server received: %s', data);
        });

        ws.on('broadcast-incl', broadcastIncl);

        ws.on('broadcast-excl', broadcastExcl);

        ws.send('something from server');

        ws.on('close', function () {
            console.log('client is going away');
        });
    });

    wss.on('close', function close() {
        clearInterval(interval);
    });

    /**
     * Client socket liveliness check
     */

    const interval = setInterval(function ping() {
        wss.clients.forEach(function each(ws) {
            if (ws.isAlive === false) return ws.terminate();

            ws.isAlive = false;
            ws.ping();
        });
    }, pingInterval);

    function heartbeat() {
        this.isAlive = true;
    }

    /**
     * broadcast message
     */

    const broadcastIncl = function (data, isBinary = false) {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    }

    const broadcastExcl = function (data, isBinary = false) {
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        })
    }
};

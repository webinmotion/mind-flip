module.exports = function (server) {

    /**
     * Module dependencies.
     */
    const WebSocket = require('ws');
    const querystring = require("querystring");
    const HEARTBEAT_INTERVAL = 30000;

    /**
     * Create websocket server
     */
    const wss = new WebSocket.WebSocketServer({noServer: true, path: '/quickvote', clientTracking: true});

    /**
     * Client authentication
     */

    function onPreSocketError(err) {
        console.error(err);
    }

    function onPostSocketError(err) {
        console.error(err);
    }

    function authenticateClient(request, onCompleted) {
        const {code} = querystring.parse(request.url.replace(/.*?\?/, ""));
        const {organizer, sender, ticket} = 
        //validate the ticket (if necessary) before proceeding
        onCompleted(null, {code, organizer, sender})
    }

    server.on('upgrade', function upgrade(request, socket, head) {
        socket.on('error', onPreSocketError);

        // custom authentication function
        authenticateClient(request, (err, metadata) => {
            if (err || !metadata) {
                socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                socket.destroy();
                return;
            }

            socket.removeListener('error', onPreSocketError);

            wss.handleUpgrade(request, socket, head, function done(ws) {
                wss.emit('connection', ws, request, metadata);
            });
        });
    });

    /**
     * Configure websocket callbacks
     */

    wss.on('connection', function connection(ws, request, metadata) {

        const {code, organizer, sender} = metadata;
        //log out client connection metadata
        console.log('connection request: %s\nconnection ticket: %s\nconnection sender: %s\nconnection from organizer? %s\n',
            request.url, ticket, sender, organizer);

        //add operational attributes to ws client
        ws.isAlive = true;
        ws.ticket = ticket;
        ws.organizer = organizer;
        ws.attendee = sender;
        ws.broadcast = broadcast.bind(ws);
        ws.publish = publish.bind(ws);

        //add event handlers to ws client
        ws.on('error', onPostSocketError);
        ws.on('message', (rawData) => {
            const json = rawData.toString('utf8');
            console.log('server received: %s', json);
            const data = JSON.parse(json);
            const {event, broadcast,} = data;
            if (event === 'pong') {
                ws.isAlive = true;
            } else if (event === 'CHOICE_POSTED_EVENT') {
                ws.publish({data: {...data, organizer, sender}, ticket,});
            } else {
                if (broadcast) {
                    ws.broadcast({data: {...data, organizer, sender}, ticket,});
                }
            }
        });

        ws.send(JSON.stringify({event: 'server', payload: 'connection established in the server'}));

        ws.on('close', (e) => {
            console.log(e, 'client is going away');
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
            console.log(`server heartbeat: ws.alive? ${ws.isAlive}`);
            if (ws.isAlive === false) return ws.terminate();

            ws.isAlive = false;
            console.log('sending ping probe')
            ws.send(JSON.stringify({event: "ping", payload: "heartbeat"}));
        });
    }, HEARTBEAT_INTERVAL);

    /**
     * broadcast message
     */

    function broadcast({data, ticket,}, isBinary = false) {
        [...wss.clients].filter(client => {
            return client.ticket === ticket;
        }).filter(client => {
            if (!data.inclusive) {
                return client !== this;
            } else {
                return true
            }
        }).forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data), {binary: isBinary});
            }
        });
    }

    function publish({data, ticket,}, isBinary = false) {
        //expecting only one client
        const [client] = [...wss.clients].filter(client => {
            return client.ticket === ticket && client.organizer === String(true);
        });

        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data), {binary: isBinary});
        }
    }
};

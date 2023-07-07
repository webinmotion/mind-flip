const WebSocket = require('ws');

function heartbeat() {
    clearTimeout(this.pingTimeout);

    // Use `WebSocket#terminate()`, which immediately destroys the connection,
    // instead of `WebSocket#close()`, which waits for the close timer.
    // Delay should be equal to the interval at which your server
    // sends out pings plus a conservative assumption of the latency.
    this.pingTimeout = setTimeout(() => {
        this.terminate();
    }, 5000 + 1000);
}

const ws = new WebSocket('ws://localhost:3000/play?ticket=1233', {
    headers: {'ws-client-id': '1233'} //adding headers is not possible with browser websocket
});

ws.on('error', console.error);

ws.on('open', function open() {
    heartbeat.call(this);
    ws.send('something from client');
});

ws.on('ping', heartbeat);

ws.on('message', function message(data) {
    console.log('client received: %s', data);
});

ws.on('close', function clear() {
    clearTimeout(this.pingTimeout);
});
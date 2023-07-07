document.querySelector('button[title=conn]').addEventListener('click', startConnect);

function startConnect() {
    function heartbeat() {
        clearTimeout(this.pingTimeout);

        this.pingTimeout = setTimeout(() => {
            this.close();
        }, 30000 + 1000);
    }

    const socket  = new WebSocket('ws://localhost:3000/play?ticket=unique-client-id');

    socket.addEventListener('error', console.error);

    socket.addEventListener('open', function open() {
        heartbeat.call(this);
        socket.send('something from client');
    });

    socket.addEventListener('ping', heartbeat);

    socket.addEventListener('message', function message(data) {
        console.log('client received: %s', JSON.stringify(data));
    });

    socket.addEventListener('close', function clear() {
        clearTimeout(this.pingTimeout);
        document.querySelector('button[title=incl]').removeEventListener('click', onInclusive);
        document.querySelector('button[title=excl]').removeEventListener('click', onExclusive);
    });

    function onInclusive(){
        socket.send('broadcast-incl', 'all inclusive')
    }

    function onExclusive(){
        socket.send('broadcast-excl', 'all-exclusive')
    }

    document.querySelector('button[title=incl]').addEventListener('click', onInclusive);

    document.querySelector('button[title=excl]').addEventListener('click', onExclusive);
}
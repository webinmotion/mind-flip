import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Connect({ children }) {

    const basePath = "http://localhost:5000";
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (!connected) {
            const socket = io(basePath, {
                path: '/playtime'
            });

            socket.on('connect', () => {
                console.log(`client ${socket.id} connection acknowledged`);
            })

            socket.on('health', msg => {
                console.log(`health check response - ${msg}`);
            });

            //send event to the server
            socket.emit('health', { task: 'health-check' });

            socket.on('on-debate', msg => {
                console.log(`debate-topic response - ${msg}`);
            });

            //send event to a room in the server
            socket.emit('debate-topic', { topic: 'kilimanjaro' }, 'debate-room');

            //set connected to be true
            setConnected(true);
        }
    }, [connected]);

    return (
        <>{children}</>
    )
}

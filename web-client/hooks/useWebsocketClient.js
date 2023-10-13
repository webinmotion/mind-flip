import {useEffect, useState} from "react";
import {wserverUrl} from "../services/request";
import useWebsocketState from './useWebsocketState';

const HEARTBEAT_INTERVAL = 30000;
const INTERVAL_BUFFER = 2000;

export const CHOICE_POSTED_EVENT = "CHOICE_POSTED_EVENT";
export const CHOICES_UPDATED_EVENT = "CHOICES_UPDATED_EVENT";
export const QUESTION_UPDATED_EVENT = "QUESTION_UPDATED_EVENT";
export const VOTING_REVEALED_EVENT = "VOTING_REVEALED_EVENT";
export const ATTENDEE_JOINED_EVENT = "ATTENDEE_JOINED_EVENT";
export const ATTENDEE_EXITED_EVENT = "ATTENDEE_EXITED_EVENT";

export default function useWebsocketClient({connectionString, updateChoices, updateQuestion, revealVoting, updateVoting, includeAttendee, removeAttendee,}) {

    const [connection, setConnection] = useState(null);
    let pingTimeout = 0;

    useEffect(() => {
        if (!connection) {
            const client = new WebSocket(`${wserverUrl()}/${connectionString}`)

            client.addEventListener('error', console.error);

            client.addEventListener('open', () => {
                heartbeat.call(client);
                client.send(JSON.stringify({event: 'client', payload: 'connection opened by client'}));
            });

            client.addEventListener('message', (data) => {
                const {event, payload} = JSON.parse(data.data);
                console.log("incoming data = %s, event name = %s, payload = %s", data.data, event, payload);
                switch (event) {
                    case "ping": {
                        heartbeat.call(client);
                        break;
                    }
                    case CHOICES_UPDATED_EVENT: {
                        updateChoices(payload)
                        break;
                    }
                    case QUESTION_UPDATED_EVENT: {
                        updateQuestion(payload)
                        break;
                    }
                    case VOTING_REVEALED_EVENT: {
                        revealVoting(payload)
                        break;
                    }
                    case ATTENDEE_JOINED_EVENT: {
                        includeAttendee(payload)
                        break;
                    }
                    case ATTENDEE_EXITED_EVENT: {
                        removeAttendee(payload)
                        break;
                    }
                    case CHOICE_POSTED_EVENT: {
                        updateVoting(payload)
                        break;
                    }
                    default: {
                        console.log('unhandled event', event);
                    }
                }
            });

            client.addEventListener('close', function clear() {
                console.log('server is dropping connection');
                clearTimeout(pingTimeout);
            });

            //finally, set connection
            setConnection(client);
        }

        return () => {
            //close this connection
            if (connection && connection.readyState !== WebSocket.CLOSED) {
                connection.close();
            }
        }
    }, []);

    function heartbeat() {
        clearTimeout(pingTimeout);

        pingTimeout = setTimeout(() => {
            console.log('client is closing connection - no ping from the server');
            this.close();
        }, HEARTBEAT_INTERVAL + INTERVAL_BUFFER); //30 seconds server heartbeat interval + 5 seconds buffer

        this.send(JSON.stringify({event: "pong",}));
    }

    function sendBroadcast(data, inclusive = true) {
        connection.send(JSON.stringify({...data, broadcast: true, inclusive: !inclusive}))
    }

    return {sendBroadcast}
}

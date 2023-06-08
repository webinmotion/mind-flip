import { useEffect, useRef, useState } from 'react';

export default function Listener({ participant }) {

    const listRef = useRef();
    const [question, setQuestion] = useState({});

    useEffect(() => {
        if (participant) {
            const { game_id, participant_id } = participant;
            const evtSource = new EventSource(`http://localhost:5000/play/game/${game_id}/participant/${participant_id}`);

            evtSource.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                setQuestion(parsedData);
            }

            evtSource.addEventListener("joined", (event) => {
                const newPlayer = document.createElement("li");
                const screen_name = JSON.parse(event.data).screen_name;
                newPlayer.textContent = screen_name;
                listRef.current.appendChild(newPlayer);
            });
        }
    }, [participant]);

    return <>
        <div>
            <p>Players List</p>
            <ul id='players-list' ref={listRef}></ul>
        </div>
        <div>
            <p>Current Question</p>
            <p>{question.que_value}</p>
        </div>
    </>;
}

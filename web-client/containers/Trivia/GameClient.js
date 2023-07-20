import React, { useEffect } from 'react';
import GameClient from "../../components/Trivia/GameClient";
import { serverUrl } from "../../services/request";
import { useNavigate, useParams } from "react-router-dom";

export default function GameClientContainer(props) {

    let navigate = useNavigate();
    let { gameId, playerId } = useParams();
    const { trivia, onProgressionEvents, } = props;

    useEffect(() => {
        const evtSource = new EventSource(`${serverUrl()}/play/client/${gameId}/player/${playerId}`)
        if (gameId && playerId) {
            onProgressionEvents(evtSource);
        }

        return () => {
            evtSource.close();
        }
    }, [gameId, playerId]);

    const submitAnswer = (event) => { }

    const submitChoice = (value) => { }

    return <GameClient
        progression={trivia.progression}
        navigate={navigate}
        submitAnswer={submitAnswer}
        submitChoice={submitChoice}
        {...props} />
}

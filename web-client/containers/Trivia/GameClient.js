import React, { useEffect } from 'react';
import GameClient from "../../components/Trivia/GameClient";
import { serverUrl } from "../../services/request";
import { useNavigate, useParams } from "react-router-dom";
import {remoteSendResponseToQuestion} from "../../services/playtime";

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

    const submitAnswer = (event) => {
        event.preventDefault();
        const { que_id } = trivia.progression.question;
        const data = new FormData(event.currentTarget);
        //participant, question, { answer_submitted, clock_remaining, tally_points }
        remoteSendResponseToQuestion(gameId, playerId, que_id, data.get('answer'));
    };

    const submitChoice = (value) => {
        const { que_id } = trivia.progression.question;
        //participant, question, { answer_submitted, clock_remaining, tally_points }
        remoteSendResponseToQuestion(gameId, playerId, que_id, value);
    }

    return <GameClient
        progression={trivia.progression}
        navigate={navigate}
        submitAnswer={submitAnswer}
        submitChoice={submitChoice}
        {...props} />
}

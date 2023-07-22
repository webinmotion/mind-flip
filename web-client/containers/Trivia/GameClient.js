import React, {useEffect, useState} from 'react';
import GameClient from "../../components/Trivia/GameClient";
import {serverUrl} from "../../services/request";
import {useNavigate, useParams} from "react-router-dom";
import {remoteSendResponseToQuestion} from "../../services/playtime";
import GamePlacard from "../../components/Trivia/GamePlacard";

export default function GameClientContainer(props) {

    let navigate = useNavigate();
    let {gameId, playerId} = useParams();
    const {onProgressionEvents, onProgressBarEvents} = props;

    useEffect(() => {
        const evtSource = new EventSource(`${serverUrl()}/play/client/${gameId}/player/${playerId}`)
        if (gameId && playerId) {
            onProgressionEvents(evtSource);
            onProgressBarEvents(evtSource);
        }

        return () => {
            evtSource.close();
        }
    }, [gameId, playerId]);

    useEffect(() => {
        if (props.progress?.hasOwnProperty("question") && props.trivia?.progression?.question?.number > 0) {
            const {pre_delay, duration, interval, post_delay, number, points} = props.progress;
            setCounterOnTimeout({pre_delay, duration, interval, post_delay, number, points});
        }
    }, [props.trivia?.progression?.question?.number]);

    useEffect(() => {
        if (props.progress?.hasOwnProperty("placard") && props.trivia?.progression?.placard?.number > 0) {
            const {pre_delay, duration, interval, post_delay, number, points} = props.progress;
            setCounterOnTimeout({pre_delay, duration, interval, post_delay, number, points});
        }
    }, [props.trivia?.progression?.placard?.number]);

    const setCounterOnTimeout = ({pre_delay, duration, interval, post_delay, number, points}) => {
        //fire up progress indicator
        props.showProgress({
            pre_delay,
            duration,
            interval,
            post_delay,
            number,
            points,
            oncountdown: function ({countDown, timeRemaining}) {
                console.log('countDown, timeRemaining', countDown, timeRemaining);
            },
            precountdown: (questionNumber) => console.log(`question ${questionNumber} coming up next...`),
            postcountdown: () => console.log("moving on"),
        });
    }

    const submitAnswer = (event) => {
        event.preventDefault();
        const {que_id} = props.trivia.progression.question;
        const data = new FormData(event.currentTarget);
        //participant, question, { answer_submitted, clock_remaining, tally_points }
        remoteSendResponseToQuestion(gameId, playerId, que_id, data.get('answer'));
    };

    const submitChoice = (value) => {
        const {que_id} = props.trivia.progression.question;
        //participant, question, { answer_submitted, clock_remaining, tally_points }
        remoteSendResponseToQuestion(gameId, playerId, que_id, value);
    }

    return props.trivia?.progression?.type === "question" ?
        <GameClient
            progression={props.trivia.progression}
            navigate={navigate}
            submitAnswer={submitAnswer}
            submitChoice={submitChoice}
            {...props} />
        :
        <GamePlacard progression={props.trivia.progression}/>
}

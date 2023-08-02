import React, {useEffect, useState} from 'react';
import GameMultiPlay from "../../components/Trivia/GameMultiPlay";
import {serverUrl} from "../../services/request";
import {useNavigate, useParams} from "react-router-dom";
import {remoteSendResponseToQuestion} from "../../services/playtime";
import GameMessage from "../../components/Trivia/GameMessage";

export default function GameMultiPlayContainer(props) {

    let navigate = useNavigate();
    let {gameId, playerId} = useParams();
    const {onProgressionEvents, onProgressBarEvents} = props;
    const [localProgress, setLocalProgress] = useState({timeRemaining: 0, countDown: 0})

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
        if (props.progress?.hasOwnProperty("message") && props.trivia?.progression?.message?.number > 0) {
            const {pre_delay, duration, interval, post_delay, number, points} = props.progress;
            setCounterOnTimeout({pre_delay, duration, interval, post_delay, number, points});
        }
    }, [props.trivia?.progression?.message?.number]);

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
                setLocalProgress(prev => ({...prev, countDown, timeRemaining }))
            },
            precountdown: (questionNumber) => console.log(`question ${questionNumber} coming up next...`),
            postcountdown: () => console.log("moving on"),
        });
    }

    const submitAnswer = async (event) => {
        event.preventDefault();
        let {que_id, que_answer, max_points, score_strategy, countdown_duration} = props.trivia?.progression?.question;
        let {game_id, participant_id} = props.trivia?.participant
        const data = new FormData(event.currentTarget);
        let answer_submitted = data.get('answer');
        //submit response data
        await remoteSendResponseToQuestion(game_id, participant_id, que_id, {
            display_duration: countdown_duration,
            expected_answer: que_answer,
            max_points,
            score_strategy,
            answer_submitted,
            time_remaining: localProgress.timeRemaining,
            points_remaining: localProgress.countDown,
        });
    };

    const submitChoice = async (answer_submitted) => {
        let {que_id, que_answer, max_points, score_strategy, countdown_duration} = props.trivia?.progression?.question;
        let {game_id, participant_id} = props.trivia?.participant
        //submit response data
        await remoteSendResponseToQuestion(game_id, participant_id, que_id, {
            display_duration: countdown_duration,
            expected_answer: que_answer,
            max_points,
            score_strategy,
            answer_submitted,
            time_remaining: localProgress.timeRemaining,
            points_remaining: localProgress.countDown,
        });
    }

    return props.trivia?.progression?.type === "question" ?
        <GameMultiPlay
            progression={props.trivia.progression}
            navigate={navigate}
            submitAnswer={submitAnswer}
            submitChoice={submitChoice}
            {...props} />
        :
        <GameMessage progression={props.trivia.progression}/>
}

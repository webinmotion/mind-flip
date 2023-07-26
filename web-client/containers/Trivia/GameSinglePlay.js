import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import GameSinglePlay from "../../components/Trivia/GameSinglePlay";
import {
    remoteFetchGameEngine,
    remoteFetchGameInfoById,
    remoteFetchGameLayout,
    remoteFetchGameQuestion,
    remoteFetchQuestionChoices,
    remoteUpdateParticipantAnswer,
} from "../../services/trivia";

export default function GameSinglePlayContainer(props) {

    let {gameId} = useParams();
    const [counter, setCounter] = useState(0);
    const [gameInfo, setGameInfo] = useState({});
    const [gameLayout, setGameLayout] = useState([]);
    const [gameEngine, setGameEngine] = useState({});
    const [gameQuestion, setGameQuestion] = useState({});
    const [localProgress, setLocalProgress] = useState({countDown: 0, timeRemaining: 0});

    const navigate = useNavigate();

    useEffect(() => {
        //fetch game info
        remoteFetchGameInfoById(gameId).then(info => {
            setGameInfo(info);

            //fetch game engine
            remoteFetchGameEngine(gameId).then(engine => {
                setGameEngine(engine);

                //fetch game layout
                remoteFetchGameLayout(gameId).then(layout => {
                    setGameLayout(layout);
                    setCounter(layout[0].section_index);

                    //fetch first question
                    nextQuestion(engine, layout, 0, engine?.progression === 'auto' ? setCounterOnTimeout : null);
                });
            });
        });
    }, [gameId]);

    function nextQuestion(engine, layout, index, updateCounter) {
        if (index < layout.length) {

            //fetch current question
            const {current_section, section_index, question_fk} = layout[index];
            remoteFetchGameQuestion(question_fk).then(question => {

                //fetch question choices if they exist
                if (question.has_choices) {
                    remoteFetchQuestionChoices(question_fk).then(choices => {
                        setGameQuestion(prevQue => ({
                            ...prevQue,
                            round: current_section,
                            number: section_index, ...question,
                            choices
                        }));

                        //update current counter
                        if (typeof updateCounter === 'function') {
                            updateCounter(engine, layout, index + 1, question?.max_points);
                        }
                    });
                } else {
                    setGameQuestion({round: current_section, number: section_index, ...question, choices: []});

                    //update current counter
                    if (typeof updateCounter === 'function') {
                        updateCounter(engine, layout, index + 1, question?.max_points);
                    }
                }
            });
        }
    }

    function setCounterOnTimeout(engine, layout, number, points) {
        //fire up progress indicator
        props.showProgress({
            pre_delay: engine?.pre_countdown_delay,
            duration: engine?.countdown_duration,
            interval: engine?.countdown_interval,
            post_delay: engine?.post_countdown_delay,
            number,
            points,
            oncountdown: function ({countDown, timeRemaining}) {
                setLocalProgress(prevProgress => ({...prevProgress, countDown, timeRemaining}));
                console.log('countDown, timeRemaining', countDown, timeRemaining);
            },
            precountdown: (questionNumber) => console.log(`question ${questionNumber} coming up next...`),
            postcountdown: () => nextQuestion(engine, layout, number, setCounterOnTimeout),
        });
    }

    function setCounterOnDemand() {
        setCounter(prevCounter => prevCounter + 1);
        nextQuestion(gameEngine, gameLayout, counter)
    }

    const submitAnswer = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const answer_submitted = data.get('answer');
        await submitChoice(answer_submitted);
    };

    const submitChoice = async (value) => {
        const {question_fk, score_strategy} = gameLayout[counter - 1];
        const {game_id, participant_id} = props.participant;
        const {countDown, timeRemaining} = localProgress;
        const {max_points, que_answer} = gameQuestion;
        const {countdown_duration} = gameEngine;
        //game_id, participant_id, question_id, { answer_submitted, display_duration, max_points, score_strategy, expected_answer, time_remaining, points_remaining
        await remoteUpdateParticipantAnswer(game_id, participant_id, question_fk, {
            answer_submitted: value,
            time_remaining: timeRemaining,
            points_remaining: countDown,
            expected_answer: que_answer,
            max_points,
            score_strategy,
            display_duration: countdown_duration,
        });
    }

    return (
        <GameSinglePlay
            navigate={navigate}
            info={gameInfo}
            engine={gameEngine}
            current={gameQuestion}
            onNext={gameEngine?.progression === 'manual' ? setCounterOnDemand : null}
            hasMore={gameLayout.length > counter}
            submitAnswer={submitAnswer}
            submitChoice={submitChoice}
            {...props}
        />)
}
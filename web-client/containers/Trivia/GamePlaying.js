import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GamePlaying from "../../components/Trivia/GamePlaying";
import {
    remoteFetchGameEngine, remoteFetchGameLayout, remoteFetchGameQuestion, remoteFetchQuestionChoices,
    remoteRespondToQuestion
} from "../../services/trivia";

export default function GamePlayingContainer(props) {

    let { gameId } = useParams();
    const [counter, setCounter] = useState(0);
    const [gameQue, setGameQue] = useState({});
    const [gameLayout, setGameLayout] = useState([]);
    const [gameEngine, setGameEngine] = useState({});
    const [progress, setProgress] = useState({ countDown: 0, timeRemaining: 0 });

    const navigate = useNavigate();

    useEffect(() => {
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
    }, [gameId]);

    function nextQuestion(engine, layout, index, updateCounter) {
        if (index < layout.length) {

            //fetch current question
            const { current_section, section_index, question_fk } = layout[index];
            remoteFetchGameQuestion(question_fk).then(question => {

                //fetch question choices if they exist
                if (question.has_choices) {
                    remoteFetchQuestionChoices(question_fk).then(choices => {
                        setGameQue(prevQue => ({ ...prevQue, round: current_section, number: section_index, ...question, choices }));

                        //update current counter
                        if (typeof updateCounter === 'function') {
                            updateCounter(engine, layout, section_index, question?.max_points);
                        }
                    });
                }
                else {
                    setGameQue({ round: current_section, number: section_index, ...question, choices: [] });

                    //update current counter
                    if (typeof updateCounter === 'function') {
                        updateCounter(engine, layout, section_index, question?.max_points);
                    }
                }
            });
        }
    }

    function setCounterOnTimeout(engine, layout, number, points) {
        //fire up progress indicator
        props.showProgress({
            delay: engine?.initial_delay,
            interval: 100,
            duration: engine?.display_duration,
            number,
            points,
            oncountdown: function ({ countDown, timeRemaining }) {
                setProgress(prevProgress => ({ ...prevProgress, countDown, timeRemaining }));
                console.log('countDown, timeRemaining', countDown, timeRemaining);
            },
            precountdown: (questionNumber) => console.log(`question ${questionNumber} coming next...`),
            postcountdown: () => nextQuestion(engine, layout, number, setCounterOnTimeout),
        });
    }

    function setCounterOnDemand() {
        setCounter(prevCounter => prevCounter + 1);
        nextQuestion(gameEngine, gameLayout, counter)
    }

    const submitAnswer = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const question = gameLayout[counter - 1].question_fk;
        const participant = props.participant.participant_id;
        const {countDown, timeRemaining} = progress;
        //participant, question, { answer_submitted, clock_remaining, tally_points }
        remoteRespondToQuestion(participant, question, { answer_submitted: data.get('answer'), clock_remaining: timeRemaining, tally_points: countDown });
    };

    const submitChoice = (value) => {
        const question = gameLayout[counter - 1].question_fk;
        const participant = props.participant.participant_id;
        const {countDown, timeRemaining} = progress;
        //participant, question, { answer_submitted, clock_remaining, tally_points }
        remoteRespondToQuestion(participant, question, { answer_submitted: value, clock_remaining: timeRemaining, tally_points: countDown });
    }

    return (
        <GamePlaying
            navigate={navigate}   
            engine={gameEngine}
            current={gameQue}
            onNext={gameEngine?.progression === 'manual' ? setCounterOnDemand : null}
            hasMore={gameLayout.length > counter}
            submitAnswer={submitAnswer}
            submitChoice={submitChoice}
            {...props}
        />)
}
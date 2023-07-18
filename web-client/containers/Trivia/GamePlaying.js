import { useEffect, useState } from "react";
import GamePlaying from "../../components/Trivia/GamePlaying";
import { useParams } from "react-router-dom";
import { remoteFetchGameEngine, remoteFetchGameLayout, remoteFetchGameQuestion, remoteFetchQuestionChoices } from "../../services/trivia";

export default function GamePlayingContainer(props) {

    let { gameId } = useParams();
    const [counter, setCounter] = useState(0);
    const [ready, setReady] = useState(false);
    const [gameQue, setGameQue] = useState(null);
    const [gameEngine, setGameEngine] = useState(null);
    const [gameLayout, setGameLayout] = useState([]);

    useEffect(() => {
        //fetch game engine
        remoteFetchGameEngine(gameId).then(engine => {
            setGameEngine(engine);

            //fetch game layout
            remoteFetchGameLayout(gameId).then(layout => {
                setGameLayout(layout);

                //set ready
                setReady(true);
            });
        });
    }, [gameId]);

    useEffect(() => {
        if (ready) {
            nextQuestion(gameEngine?.progression === 'auto' ? setCounterOnTimeout : null);
            //fire up progress indicator
            props.showProgress({
                delay: gameEngine?.initial_delay,
                interval: 100,
                duration: gameEngine?.display_duration,
                points: 1000,
                number: counter + 1
            });
        }
    }, [ready, counter]);

    function nextQuestion(updateCounter) {
        const limit = gameLayout.length;
        if (limit > counter) {

            //fetch current question
            const { current_section, section_index, question_fk } = gameLayout[counter];
            remoteFetchGameQuestion(question_fk).then(question => {

                //fetch question choices if they exist
                if (question.has_choices) {
                    remoteFetchQuestionChoices(question_fk).then(choices => {
                        setGameQue({ round: current_section, number: section_index, ...question, choices });

                        //update current counter
                        if (typeof updateCounter === 'function') {
                            updateCounter();
                        }
                    });
                }
                else {
                    setGameQue({ round: current_section, number: section_index, ...question, choices: [] });

                    //update current counter
                    if (typeof updateCounter === 'function') {
                        updateCounter();
                    }
                }
            });
        }
    }

    function setCounterOnTimeout() {
        const { initial_delay, display_duration } = gameEngine;
        let duration = initial_delay + display_duration;
        let handle = setTimeout(() => {
            setCounter(counter + 1);
            props.showProgress({ number: counter + 1 });
            clearTimeout(handle);
        }, duration);
    }

    function setCounterOnDemand() {
        setCounter(counter + 1);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // submitAnswer(data.get('answer'));
    };

    return (
        <GamePlaying
            engine={gameEngine}
            current={gameQue}
            onNext={gameEngine?.progression === 'manual' ? setCounterOnDemand : null}
            hasMore={gameLayout.length > counter + 1}
            handleSubmit={handleSubmit}
            {...props}
        />)
}
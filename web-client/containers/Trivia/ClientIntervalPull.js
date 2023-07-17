import { useEffect, useState } from "react";
import GamePlaying from "../../components/Trivia/GamePlaying";
import { useParams } from "react-router-dom";
import { remoteFetchGameEngine, remoteFetchGameLayout, remoteFetchGameQuestion, remoteFetchQuestionChoices } from "../../services/trivia";

export default function ClientIntervalPull(props) {

    let { gameId } = useParams();
    const [counter, setCounter] = useState(0);
    const [layout, setLayout] = useState(null);
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

                //set current layout idx
                setLayout(layout[counter]);
            });
        });
    }, [gameId]);

    useEffect(() => {
        if (layout && gameEngine) {
            const { initial_delay, display_duration } = gameEngine;
            setInterval(() => {
                nextQuestion()
            }, (initial_delay + display_duration));
        }

    }, [layout, gameEngine]);

    function nextQuestion() {
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
                        setCounter(counter + 1);
                    });
                }
                else {
                    setGameQue({ round: current_section, number: section_index, ...question, choices: [] });

                    //update current counter
                    setCounter(counter + 1);
                }
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // submitAnswer(data.get('answer'));
    };

    return <GamePlaying
        engine={gameEngine}
        current={gameQue}
        hasMore={gameLayout.length > counter}
        handleSubmit={handleSubmit}
        {...props}
    />
}
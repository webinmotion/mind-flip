import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/appContext';
import Trivia from '../TriviaComponent';
// import Connect from './Connect';

function TriviaContainer() {

    const { trivia, fetchGameInfo, addGameParticipant, ...rest } = useAppContext();
    const [{ title, organizer }, initializeGame] = useState({ title: '', organizer: '' });
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (title && organizer) {
            fetchGameInfo(title, organizer);
        }
    }, [title, organizer]);

    useEffect(() => {
        if (email) {
            addGameParticipant(trivia.info.game_id, email);
        }
    }, [email]);

    return (
        <Trivia trivia={trivia} joinByEmail={setEmail} initializeGame={initializeGame} {...rest} />
    )
}

export default TriviaContainer
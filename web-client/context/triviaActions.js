import {
    remoteFetchGamesListing,
    remoteFetchGameInfo, remoteFetchProgression,
    remoteFetchGameLayout, remoteFetchGameQuestion,
    remoteFetchGameEngine, remoteCreateGameEngine,
    remoteUpdateGameEngine, remoteRespondToQuestion,
    remoteFetchCumulativeTally, remoteUpdateHighestScore,
    remoteAddGameParticipant, remoteDropGameParticipant,
    remoteFetchPlayerByEmail, remoteFetchGameParticipants,
    remoteFetchGameParticipant,
} from '../services/trivia';

export const FETCH_GAMES_LISTING = "FETCH_GAMES_LISTING";
export const FETCH_GAME_INFO = "FETCH_GAME_INFO";
export const FETCH_PROGRESSION = "FETCH_MEETINGS_BY_PAGE";
export const FETCH_GAME_LAYOUT = "CREATE_MEETING";
export const FETCH_GAME_QUESTION = "FETCH_GAME_QUESTION";
export const FETCH_GAME_ENGINE = "FETCH_GAME_ENGINE";
export const FETCH_GAME_PARTICIPANT = "FETCH_GAME_PARTICIPANT";
export const FETCH_GAME_PARTICIPANTS = "FETCH_GAME_PARTICIPANTS";
export const FETCH_PLAYER_BY_EMAIL = "FETCH_PLAYER_BY_EMAIL";
export const CREATE_GAME_ENGINE = "CREATE_GAME_ENGINE";
export const UPDATE_GAME_ENGINE = "UPDATE_GAME_ENGINE";
export const ADD_GAME_PARTICIPANT = "ADD_GAME_PARTICIPANT";
export const DROP_GAME_PARTICIPANT = "DROP_GAME_PARTICIPANT";
export const FETCH_CUMULATIVE_TALLY = "FETCH_CUMULATIVE_TALLY";
export const UPDATE_HIGHEST_SCORE = "UPDATE_HIGHEST_SCORE";
export const ON_SSE_TESTING_EVENT = "ON_SSE_TESTING_EVENT";
export const ON_GAME_CREATED_EVENT = "ON_GAME_CREATED_EVENT";
export const ON_GAME_AWAITING_EVENT = "ON_GAME_AWAITING_EVENT";
export const ON_GAME_PLAYING_EVENT = "ON_GAME_PLAYING_EVENT";
export const ON_GAME_STARTING_EVENT = "ON_GAME_STARTING_EVENT";
export const ON_PARTICIPANT_JOINED = "ON_PARTICIPANT_JOINED";
export const ON_PARTICIPANT_EXITED = "ON_PARTICIPANT_EXITED";
export const ON_NEXT_QUESTION_EVENT = "ON_NEXT_QUESTION_EVENT";
export const ON_POINTS_SCORED_EVENT = "ON_POINTS_SCORED_EVENT";
export const ON_CURRENT_TALLY_EVENT = "ON_CURRENT_TALLY_EVENT";

export const fetchGamesListingAction = dispatch => () => {
    remoteFetchGamesListing().then(listing => {
        dispatch({type: FETCH_GAMES_LISTING, listing});
    });
}

export const fetchGameInfoAction = dispatch => (title, organizer) => {
    remoteFetchGameInfo(title, organizer).then(info => {
        dispatch({type: FETCH_GAME_INFO, title, organizer, info});
        //fetch game layout
        fetchGameLayoutAction(dispatch)(info.game_id);
        //fetch game engine
        fetchGameEngineAction(dispatch)(info.game_id);
    });
}

export const fetchProgressionAction = dispatch => (time_ticker) => {
    remoteFetchProgression(time_ticker).then(ticker =>
        dispatch({type: FETCH_PROGRESSION, ticker}));
}

export const fetchGameLayoutAction = dispatch => (game) => {
    remoteFetchGameLayout(game).then(layout =>
        dispatch({type: FETCH_GAME_LAYOUT, layout}));
}

export const fetchGameQuestionAction = dispatch => (que_id) => {
    remoteFetchGameQuestion(que_id).then(question =>
        dispatch({type: FETCH_GAME_QUESTION, question}));
}

export const fetchGameEngineAction = dispatch => game => {
    remoteFetchGameEngine(game).then(engine => {
        dispatch({type: FETCH_GAME_ENGINE, engine});
        //fetch progression type
        fetchProgressionAction(dispatch)(engine.time_ticker);
    });
}

export const fetchGameParticipantsAction = dispatch => (game) => {
    remoteFetchGameParticipants(game).then(participants => {
        dispatch({type: FETCH_GAME_PARTICIPANTS, participants});
    });
}

export const fetchGameParticipantAction = dispatch => (participant_id) => {
    remoteFetchGameParticipant(participant_id).then(participant => {
        dispatch({type: FETCH_GAME_PARTICIPANT, participant});
    });
}

export const fetchPlayerByEmailAction = dispatch => email => {
    remoteFetchPlayerByEmail(email).then(player =>
        dispatch({type: FETCH_PLAYER_BY_EMAIL, player}));
}

export const createGameEngineAction = dispatch => id => {
    remoteCreateGameEngine(id).then(ok =>
        dispatch({type: CREATE_GAME_ENGINE, ok, id}));
}

export const updateGameEngineAction = dispatch => id => {
    remoteUpdateGameEngine(id).then(ok =>
        dispatch({type: UPDATE_GAME_ENGINE, ok, id}));
}

export const addGameParticipantAction = dispatch => ({game, email}) => {
    remoteFetchPlayerByEmail(email).then(player => {
        dispatch({type: FETCH_PLAYER_BY_EMAIL, player});
        //add as participant
        remoteAddGameParticipant(game, player.player_id).then(participant =>
            dispatch({type: ADD_GAME_PARTICIPANT, participant}));
    });
}

export const dropGameParticipantAction = dispatch => (participant) => {
    remoteDropGameParticipant(participant).then(ok =>
        dispatch(dropGameParticipantAction({type: DROP_GAME_PARTICIPANT, ok})));
}

export const respondToQuestionAction = dispatch => (participant, question, {answer_submitted, clock_remaining, tally_points}) => {
    remoteRespondToQuestion(participant, question, {answer_submitted, clock_remaining, tally_points})
        .then(result => console.log(`submission result - ${result}`));
}

export const fetchCumulativeTallyAction = dispatch => id => {
    remoteFetchCumulativeTally(id).then(ok =>
        dispatch({type: FETCH_CUMULATIVE_TALLY, ok, id}));
}

export const updateHighestScoreAction = dispatch => id => {
    remoteUpdateHighestScore(id).then(ok =>
        dispatch({type: UPDATE_HIGHEST_SCORE, ok, id}));
}

export const onGameListingEventsAction = dispatch => (evtSource) => {

    evtSource.addEventListener(ON_SSE_TESTING_EVENT, (event) => {
        console.log(event);
    });

    evtSource.addEventListener(ON_GAME_CREATED_EVENT, (event) => {
        const {data} = event;
        dispatch({type: ON_GAME_CREATED_EVENT, data: JSON.parse(data)});
    });

    evtSource.addEventListener(ON_GAME_AWAITING_EVENT, (event) => {
        const {data} = event;
        dispatch({type: ON_GAME_AWAITING_EVENT, data: JSON.parse(data)});
    });

    evtSource.addEventListener(ON_GAME_PLAYING_EVENT, (event) => {
        const {data} = event;
        dispatch({type: ON_GAME_PLAYING_EVENT, data: JSON.parse(data)});
    });
}

export const onParticipantEventsAction = dispatch => (evtSource) => {

    evtSource.addEventListener(ON_PARTICIPANT_JOINED, (event) => {
        const {data} = event;
        if (data) {
            const {participant_id} = JSON.parse(data);
            if (participant_id) {
                remoteFetchGameParticipant(participant_id).then(participant => {
                    dispatch({type: ON_PARTICIPANT_JOINED, participant});
                });
            }
        }
    });

    evtSource.addEventListener(ON_PARTICIPANT_EXITED, (event) => {
        const {data} = event;
        if (data) {
            const {participant_id} = JSON.parse(data);
            if (participant_id) {
                dispatch({type: ON_PARTICIPANT_EXITED, participant_id});
            }
        }
    });
}

export const onGameStartingEventAction = dispatch => (evtSource) => {
    //TODO: transition from awaiting page to playing page
    evtSource.addEventListener(ON_GAME_STARTING_EVENT, (event) => {
        const {data} = event;
        if (data) {
            console.log('Game is now starting', data)
        }
    });
}

export const onNextQuestionEventAction = dispatch => (evtSource) => {
    evtSource.addEventListener(ON_NEXT_QUESTION_EVENT, (event) => {
        const {data} = event;
        if (data) {
            console.log('Next question coming in hot', data)
        }
    });
}
import {
    remoteAddGameParticipant,
    remoteCreateGameEngine,
    remoteCreateGameHandle,
    remoteDeleteGameHandle,
    remoteDropGameParticipant,
    remoteFetchGameEngine,
    remoteFetchGameInfo,
    remoteFetchGameLayout,
    remoteFetchGameParticipant,
    remoteFetchGameParticipants,
    remoteFetchGameQuestion,
    remoteFetchGamesListing,
    remoteFetchGameTallies,
    remoteFetchParticipantTally,
    remoteFetchPlayerByEmail,
    remoteFetchProgression,
    remoteUpdateGameEngine,
    remoteUpdateGameStatus,
    remoteUpdateHighestScore,
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
export const CREATE_GAME_HANDLE = "CREATE_GAME_HANDLE";
export const UPDATE_GAME_STATUS = "UPDATE_GAME_STATUS";
export const DELETE_GAME_HANDLE = "DELETE_GAME_HANDLE";
export const CREATE_GAME_ENGINE = "CREATE_GAME_ENGINE";
export const UPDATE_GAME_ENGINE = "UPDATE_GAME_ENGINE";
export const ADD_GAME_PARTICIPANT = "ADD_GAME_PARTICIPANT";
export const DROP_GAME_PARTICIPANT = "DROP_GAME_PARTICIPANT";
export const FETCH_PARTICIPANT_TALLY = "FETCH_PARTICIPANT_TALLY";
export const FETCH_GAME_TALLIES = "FETCH_GAME_TALLIES";
export const UPDATE_HIGHEST_SCORE = "UPDATE_HIGHEST_SCORE";
//testing events
export const ON_SSE_TESTING_EVENT = "ON_SSE_TESTING_EVENT";
//game status changing events
export const ON_GAME_CREATED_EVENT = "ON_GAME_CREATED_EVENT";
export const ON_GAME_ACCEPTING_EVENT = "ON_GAME_ACCEPTING_EVENT";
export const ON_GAME_PLAYING_EVENT = "ON_GAME_PLAYING_EVENT";
export const ON_GAME_DELETED_EVENT = "ON_GAME_DELETED_EVENT";
//players joining and leaving
export const ON_PARTICIPANT_JOINED = "ON_PARTICIPANT_JOINED";
export const ON_PARTICIPANT_EXITED = "ON_PARTICIPANT_EXITED";
//players posting content
export const ON_PARTICIPANT_POSTED = "ON_PARTICIPANT_POSTED";
//game progression events
export const ON_GAME_STARTING_EVENT = "ON_GAME_STARTING_EVENT";
export const ON_GAME_ENDING_EVENT = "ON_GAME_ENDING_EVENT";
export const ON_BEFORE_QUESTION_EVENT = "ON_BEFORE_QUESTION_EVENT";
export const ON_QUESTION_POSTED_EVENT = "ON_QUESTION_POSTED_EVENT";
export const ON_ANSWER_POSTED_EVENT = "ON_ANSWER_POSTED_EVENT";
export const ON_MESSAGE_POSTED_EVENT = "ON_MESSAGE_POSTED_EVENT";
export const ON_AFTER_QUESTION_EVENT = "ON_AFTER_QUESTION_EVENT";
export const ON_UPDATED_TALLIES_EVENT = "ON_UPDATED_TALLIES_EVENT";

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

export const fetchProgressionAction = dispatch => (time_clock) => {
    remoteFetchProgression(time_clock).then(clock =>
        dispatch({type: FETCH_PROGRESSION, clock}));
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
        fetchProgressionAction(dispatch)(engine.time_clock);
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

export const createGameHandleAction = dispatch => ({title, organizer}) => {
    remoteCreateGameHandle({title, organizer}).then(game => {
        dispatch({type: CREATE_GAME_HANDLE, game});
    });
}

export const updateGameStatusAction = dispatch => (game_id, game_status) => {
    remoteUpdateGameStatus(game_id, game_status).then(status => {
        dispatch({type: UPDATE_GAME_STATUS, status});
    });
}

export const deleteGameHandleAction = dispatch => (game_id) => {
    remoteDeleteGameHandle(game_id).then(status => {
        dispatch({type: DELETE_GAME_HANDLE, status});
    });
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

export const fetchParticipantTallyAction = dispatch => score => {
    remoteFetchParticipantTally(id).then(ok =>
        dispatch({type: FETCH_PARTICIPANT_TALLY, ok, score}));
}

export const fetchGameTalliesAction = dispatch => scores => {
    remoteFetchGameTallies(id).then(ok =>
        dispatch({type: FETCH_GAME_TALLIES, ok, scores}));
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

    evtSource.addEventListener(ON_GAME_ACCEPTING_EVENT, (event) => {
        const {data} = event;
        dispatch({type: ON_GAME_ACCEPTING_EVENT, data: JSON.parse(data)});
    });

    evtSource.addEventListener(ON_GAME_PLAYING_EVENT, (event) => {
        const {data} = event;
        dispatch({type: ON_GAME_PLAYING_EVENT, data: JSON.parse(data)});
    });

    evtSource.addEventListener(ON_GAME_DELETED_EVENT, (event) => {
        const {data} = event;
        dispatch({type: ON_GAME_DELETED_EVENT, data: JSON.parse(data)});
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

export const onProgressionEventsAction = dispatch => (evtSource) => {

    evtSource.addEventListener(ON_GAME_STARTING_EVENT, (event) => {
        const {data} = event;
        dispatch({type: ON_GAME_STARTING_EVENT, data: JSON.parse(data)});
    });

    evtSource.addEventListener(ON_GAME_ENDING_EVENT, (event) => {
        const {data} = event;
        dispatch({type: ON_GAME_ENDING_EVENT, data: JSON.parse(data)});
    });

    evtSource.addEventListener(ON_BEFORE_QUESTION_EVENT, (event) => {
        const {data} = event;
        dispatch({type: ON_BEFORE_QUESTION_EVENT, data: JSON.parse(data)});
    });

    evtSource.addEventListener(ON_QUESTION_POSTED_EVENT, (event) => {
        const {data} = event;
        dispatch({type: ON_QUESTION_POSTED_EVENT, data: JSON.parse(data)});
    });

    evtSource.addEventListener(ON_ANSWER_POSTED_EVENT, (event) => {
        const {data} = event;
        dispatch({type: ON_ANSWER_POSTED_EVENT, data: JSON.parse(data)});
    });

    evtSource.addEventListener(ON_AFTER_QUESTION_EVENT, (event) => {
        const {data} = event;
        dispatch({type: ON_AFTER_QUESTION_EVENT, data: JSON.parse(data)});
    });

    evtSource.addEventListener(ON_MESSAGE_POSTED_EVENT, (event) => {
        const {data} = event;
        dispatch({type: ON_MESSAGE_POSTED_EVENT, data: JSON.parse(data)});
    });

    evtSource.addEventListener(ON_UPDATED_TALLIES_EVENT, (event) => {
        const {data} = event;
        dispatch({type: ON_UPDATED_TALLIES_EVENT, data: JSON.parse(data)});
    });
}
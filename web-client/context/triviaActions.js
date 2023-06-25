import {
    remoteFetchGamesListing,
    remoteFetchGameInfo, remoteFetchProgression,
    remoteFetchGameLayout, remoteFetchGameQuestion,
    remoteFetchGameEngine, remoteCreateGameEngine,
    remoteUpdateGameEngine, remoteUpdatePointsTally,
    remoteFetchCummulativeTally, remoteUpdateHighestScore,
    remoteAddGameParticipant, remoteDropGameParticipant,
    remoteFetchPlayerByEmail, remoteFetchGameParticipants
} from '../services/trivia';

export const FETCH_GAMES_LISTING = "FETCH_GAMES_LISTING";
export const FETCH_GAME_INFO = "FETCH_GAME_INFO";
export const FETCH_PROGRESSION = "FETCH_MEETINGS_BY_PAGE";
export const FETCH_GAME_LAYOUT = "CREATE_MEETING";
export const FETCH_GAME_QUESTION = "FETCH_GAME_QUESTION";
export const FETCH_GAME_ENGINE = "FETCH_GAME_ENGINE";
export const FETCH_GAME_PARTICIPANTS = "FETCH_GAME_PARTICIPANTS";
export const FETCH_PLAYER_BY_EMAIL = "FETCH_PLAYER_BY_EMAIL";
export const CREATE_GAME_ENGINE = "CREATE_GAME_ENGINE";
export const UPDATE_GAME_ENGINE = "UPDATE_GAME_ENGINE";
export const ADD_GAME_PARTICIPANT = "ADD_GAME_PARTICIPANT";
export const DROP_GAME_PARTICIPANT = "DROP_GAME_PARTICIPANT";
export const UPDATE_POINTS_TALLY = "UPDATE_POINTS_TALLY";
export const FETCH_CUMMULATIVE_TALLY = "FETCH_CUMMULATIVE_TALLY";
export const UPDATE_HIGHEST_SCORE = "UPDATE_HIGHEST_SCORE";
export const ON_SSE_TESTING_EVENT = "ON_SSE_TESTING_EVENT";
export const ON_GAME_CREATED_EVENT = "ON_GAME_CREATED_EVENT";
export const ON_GAME_AWAITING_EVENT = "ON_GAME_AWAITING_EVENT";
export const ON_GAME_PLAYING_EVENT = "ON_GAME_PLAYING_EVENT";
export const ON_PARTICIPANT_JOINED = "ON_PARTICIPANT_JOINED";
export const ON_PARTICIPANT_EXITED = "ON_PARTICIPANT_EXITED";

export const fetchGamesListingAction = dispatch => () => {
    remoteFetchGamesListing().then(listing => {
        dispatch({ type: FETCH_GAMES_LISTING, listing });
    });
}

export const fetchGameInfoAction = dispatch => (title, organizer) => {
    remoteFetchGameInfo(title, organizer).then(info => {
        dispatch({ type: FETCH_GAME_INFO, title, organizer, info });
        //fetch game layout
        fetchGameLayoutAction(dispatch)(info.game_id);
        //fetch game engine
        fetchGameEngineAction(dispatch)(info.game_id);
    });
}

export const fetchProgressionAction = dispatch => (time_ticker) => {
    remoteFetchProgression(time_ticker).then(ticker =>
        dispatch({ type: FETCH_PROGRESSION, ticker }));
}

export const fetchGameLayoutAction = dispatch => (game) => {
    remoteFetchGameLayout(game).then(layout =>
        dispatch({ type: FETCH_GAME_LAYOUT, layout }));
}

export const fetchGameQuestionAction = dispatch => (que_id) => {
    remoteFetchGameQuestion(que_id).then(question =>
        dispatch({ type: FETCH_GAME_QUESTION, question }));
}

export const fetchGameEngineAction = dispatch => game => {
    remoteFetchGameEngine(game).then(engine => {
        dispatch({ type: FETCH_GAME_ENGINE, engine });
        //fetch progression type
        fetchProgressionAction(dispatch)(engine.time_ticker);
    });
}

export const fetchGameParticipantsAction = dispatch => (game) => {
    remoteFetchGameParticipants(game).then(participants => {
        dispatch({ type: FETCH_GAME_PARTICIPANTS, participants });
    });
}

export const fetchPlayerByEmailAction = dispatch => email => {
    remoteFetchPlayerByEmail(email).then(player =>
        dispatch({ type: FETCH_PLAYER_BY_EMAIL, player }));
}

export const createGameEngineAction = dispatch => id => {
    remoteCreateGameEngine(id).then(ok =>
        dispatch({ type: CREATE_GAME_ENGINE, ok, id }));
}

export const updateGameEngineAction = dispatch => id => {
    remoteUpdateGameEngine(id).then(ok =>
        dispatch({ type: UPDATE_GAME_ENGINE, ok, id }));
}

export const addGameParticipantAction = dispatch => (game, email) => {
    remoteFetchPlayerByEmail(email).then(player => {
        dispatch({ type: FETCH_PLAYER_BY_EMAIL, player });
        //add as participant
        remoteAddGameParticipant(game, player.player_id).then(participant =>
            dispatch({ type: ADD_GAME_PARTICIPANT, participant }));
    });
}

export const dropGameParticipantAction = dispatch => (participant) => {
    remoteDropGameParticipant(participant).then(ok =>
        dispatch(dropGameParticipantAction({ type: DROP_GAME_PARTICIPANT, ok })));
}

export const updatePointsTallyAction = dispatch => id => {
    remoteUpdatePointsTally(id).then(ok =>
        dispatch({ type: UPDATE_POINTS_TALLY, ok, id }));
}

export const fetchCummulativeTallyAction = dispatch => id => {
    remoteFetchCummulativeTally(id).then(ok =>
        dispatch({ type: FETCH_CUMMULATIVE_TALLY, ok, id }));
}

export const updateHighestScoreAction = dispatch => id => {
    remoteUpdateHighestScore(id).then(ok =>
        dispatch({ type: UPDATE_POINTS_TALLY, ok, id }));
}

export const onGameListingEventsAction = dispatch => (evtSource) => {

    evtSource.addEventListener(ON_SSE_TESTING_EVENT, (event) => {
        console.log(event);
    });

    evtSource.addEventListener(ON_GAME_CREATED_EVENT, (event) => {
        const { data } = event;
        dispatch({ type: ON_GAME_CREATED_EVENT, data: JSON.parse(data) });
    });

    evtSource.addEventListener(ON_GAME_AWAITING_EVENT, (event) => {
        const { data } = event;
        dispatch({ type: ON_GAME_AWAITING_EVENT, data: JSON.parse(data) });
    });

    evtSource.addEventListener(ON_GAME_PLAYING_EVENT, (event) => {
        const { data } = event;
        dispatch({ type: ON_GAME_PLAYING_EVENT, data: JSON.parse(data) });
    });
}

export const onParticipantEventsAction = dispatch => (evtSource) => {

    evtSource.addEventListener(ON_PARTICIPANT_JOINED, (event) => {
        const { data } = event;
        dispatch({ type: ON_PARTICIPANT_JOINED, data: JSON.parse(data) });
    });

    evtSource.addEventListener(ON_PARTICIPANT_EXITED, (event) => {
        const { data } = event;
        dispatch({ type: ON_PARTICIPANT_EXITED, data: JSON.parse(data) });
    });
}
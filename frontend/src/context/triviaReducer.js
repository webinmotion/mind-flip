import {
    FETCH_GAME_INFO,
    FETCH_PROGRESSION,
    FETCH_GAME_LAYOUT,
    FETCH_GAME_QUESTION,
    FETCH_GAME_ENGINE,
    FETCH_PLAYER_BY_EMAIL,
    CREATE_GAME_ENGINE,
    UPDATE_GAME_ENGINE,
    ADD_GAME_PARTICIPANT,
    DROP_GAME_PARTICIPANT,
    UPDATE_POINTS_TALLY,
    FETCH_CUMMULATIVE_TALLY,
    UPDATE_HIGHEST_SCORE
}
    from './triviaActions';

export const triviaReducer = (game, action) => {
    console.log('state type', typeof game, 'state value', game);
    switch (action.type) {
        case FETCH_GAME_INFO:
            game.info = action.info;
            game.organizer = action.organizer;
            game.title = action.title;
            return game;
        case FETCH_PROGRESSION:
            game.ticker = action.ticker;
            return game;
        case FETCH_GAME_LAYOUT:
            game.layout = action.layout;
            return game;
        case FETCH_GAME_QUESTION:
            game.queIndex = action.queIndex;
            game.question = action.question;
            return game;
        case FETCH_GAME_ENGINE:
            game.engine = action.engine;
            return game;
        case FETCH_PLAYER_BY_EMAIL:
            game.player = action.player;
            return game;
        case CREATE_GAME_ENGINE:
            return game;
        case UPDATE_GAME_ENGINE:
            return game;
        case ADD_GAME_PARTICIPANT:
            game.participant = action.participant;
            return game;
        case DROP_GAME_PARTICIPANT:
            game.participant = null;
            return game;
        case UPDATE_POINTS_TALLY:
            return game;
        case FETCH_CUMMULATIVE_TALLY:
            return game;
        case UPDATE_HIGHEST_SCORE:
            return game;
        default:
            return game;
    }
}
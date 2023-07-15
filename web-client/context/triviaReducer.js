import { localState } from '../hooks/useLocalState';
import {
    FETCH_GAMES_LISTING,
    FETCH_GAME_INFO,
    FETCH_PROGRESSION,
    FETCH_GAME_LAYOUT,
    FETCH_GAME_QUESTION,
    FETCH_GAME_ENGINE,
    FETCH_PLAYER_BY_EMAIL,
    CREATE_GAME_ENGINE,
    UPDATE_GAME_ENGINE,
    FETCH_GAME_PARTICIPANTS,
    ADD_GAME_PARTICIPANT,
    DROP_GAME_PARTICIPANT,
    FETCH_CUMULATIVE_TALLY,
    UPDATE_HIGHEST_SCORE,
    ON_GAME_AWAITING_EVENT,
    ON_GAME_CREATED_EVENT,
    ON_GAME_PLAYING_EVENT,
    ON_PARTICIPANT_JOINED,
    ON_PARTICIPANT_EXITED,
}
    from './triviaActions';

export const initialTrivia = {
    info: null,
    player: null,
    completed: false,
    title: null,
    organizer: null,
    participant: null,
    layout: null,
    engine: null,
    driver: null,
    ticker: null,
    question: null,
    queIndex: 0,
    listing: [],
    participants: [],
    gameStatus: ['Created', 'Accepting', 'Playing']
}

export const triviaReducer = (game, action) => {
    console.log('state type', typeof game, 'state value', game);
    switch (action.type) {
        case FETCH_GAMES_LISTING: {
            return ({ ...game, listing: action.listing });
        }
        case FETCH_GAME_INFO: {
            const { info, organizer, title } = action;
            return ({ ...game, info, organizer, title });
        }
        case FETCH_PROGRESSION: {
            const { ticker } = action;
            return ({ ...game, ticker });
        }
        case FETCH_GAME_LAYOUT: {
            const { layout } = action;
            return ({ ...game, layout });
        }
        case FETCH_GAME_QUESTION: {
            const { queIndex, question } = action;
            return ({ ...game, queIndex, question });
        }
        case FETCH_GAME_ENGINE: {
            const { engine } = action;
            return ({ ...game, engine });
        }
        case FETCH_PLAYER_BY_EMAIL: {
            const { player } = action;
            localState.onPlayerInfo(player);
            return ({ ...game, player });
        }
        case CREATE_GAME_ENGINE: {
            return game;
        }
        case UPDATE_GAME_ENGINE: {
            return game;
        }
        case FETCH_GAME_PARTICIPANTS: {
            const { participants } = action;
            return ({ ...game, participants });
        }
        case ADD_GAME_PARTICIPANT: {
            const { participant } = action;
            localState.onJoinGame(participant);
            return ({ ...game, participant });
        }
        case DROP_GAME_PARTICIPANT: {
            const participant = null;
            return ({ ...game, participant });
        }
        case FETCH_CUMULATIVE_TALLY: {
            return game;
        }
        case UPDATE_HIGHEST_SCORE: {
            return game;
        }
        case ON_GAME_CREATED_EVENT:
        case ON_GAME_AWAITING_EVENT:
        case ON_GAME_PLAYING_EVENT: {
            const { game_id, game_status } = action.data;
            console.log('game', game_id, 'status', game_status);
            return ({
                ...game, listing: game.listing.map(g => {
                    if (g.game_info.game_id === game_id) {
                        return ({ ...g, game_info: { ...g.game_info, game_status } })
                    }
                    return g;
                })
            })
        }
        case ON_PARTICIPANT_JOINED: {
            const { participant } = action;
            console.log('participant joining', participant);
            if (!game.participants.some(p => p.participant_id === participant.participant_id)) {
                return ({ ...game, participants: [...game.participants, participant] });
            }
            return game;
        }
        case ON_PARTICIPANT_EXITED: {
            const { participant_id } = action;
            console.log('participant exiting', participant_id);
            if (game.participants.some(p => p.participant_id === participant_id)) {
                return ({ ...game, participants: [...game.participants.filter(p => p.participant_id !== participant_id)] });
            }
            return game;
        }
        default: {
            return game;
        }
    }
}
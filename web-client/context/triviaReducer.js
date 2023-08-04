import {localState} from '../hooks/useLocalState';
import {
    ADD_GAME_PARTICIPANT,
    CREATE_GAME_ENGINE,
    DROP_GAME_PARTICIPANT,
    FETCH_GAME_ENGINE,
    FETCH_GAME_INFO,
    FETCH_GAME_LAYOUT,
    FETCH_GAME_PARTICIPANTS,
    FETCH_GAME_QUESTION,
    FETCH_GAME_TALLIES,
    FETCH_GAMES_LISTING,
    FETCH_PARTICIPANT_TALLY,
    FETCH_PLAYER_BY_EMAIL,
    FETCH_PROGRESSION,
    ON_AFTER_QUESTION_EVENT,
    ON_ANSWER_POSTED_EVENT,
    ON_BEFORE_QUESTION_EVENT,
    ON_GAME_ACCEPTING_EVENT,
    ON_GAME_CREATED_EVENT,
    ON_GAME_DELETED_EVENT,
    ON_GAME_ENDING_EVENT,
    ON_GAME_PLAYING_EVENT,
    ON_GAME_STARTING_EVENT,
    ON_MESSAGE_POSTED_EVENT,
    ON_PARTICIPANT_EXITED,
    ON_PARTICIPANT_JOINED,
    ON_QUESTION_POSTED_EVENT,
    ON_UPDATED_TALLIES_EVENT,
    UPDATE_GAME_ENGINE,
    UPDATE_HIGHEST_SCORE,
} from './triviaActions';

export const initialTrivia = {
    info: null,
    player: null,
    completed: false,
    title: null,
    organizer: null,
    participant: null,
    score: null,
    layout: null,
    engine: null,
    driver: null,
    clock: null,
    question: null,
    queIndex: 0,
    listing: [],
    participants: [],
    scores: [],
    progression: {},
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
            const { clock } = action;
            return ({ ...game, clock });
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
        case FETCH_GAME_TALLIES: {
            const { scores } = action;
            return ({ ...game, scores });
        }
        case FETCH_PARTICIPANT_TALLY: {
            const { score } = action;
            return ({ ...game, score });
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
        case UPDATE_HIGHEST_SCORE: {
            return game;
        }
        case ON_GAME_CREATED_EVENT: {
            console.log('created game', action.data);
            return ({
                ...game, listing: [...game.listing, action.data]
            });
        }
        case ON_GAME_ACCEPTING_EVENT:
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
        case ON_GAME_DELETED_EVENT: {
            const { game_id } = action.data;
            console.log('deleted game id', game_id);
            return ({
                ...game, listing: game.listing.filter(g => g.game_info.game_id !== game_id)
            });
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
        case ON_GAME_STARTING_EVENT: {
            const {post_start_delay} = action;
            console.log('post_start_delay', post_start_delay);
            return ({...game, progression: {...game.progression, post_start_delay}});
        }
        case ON_GAME_ENDING_EVENT: {
            const ending_message = action.data;
            console.log('post_end_delay', ending_message);
            return ({...game, progression: {...game.progression, ending_message}});
        }
        case ON_BEFORE_QUESTION_EVENT: {
            const {pre_countdown_delay} = action;
            console.log('pre_countdown_delay', pre_countdown_delay);
            return ({...game, progression: {...game.progression, pre_countdown_delay}});
        }
        case ON_QUESTION_POSTED_EVENT: {
            const question = action.data;
            console.log('question', question);
            return ({...game, progression: {...game.progression, type: 'question', question}});
        }
        case ON_ANSWER_POSTED_EVENT: {
            const score = action.data;
            console.log('score', score);
            return ({...game, progression: {...game.progression, score}});
        }
        case ON_MESSAGE_POSTED_EVENT: {
            const message = action.data;
            console.log('message', message);
            return ({...game, progression: {...game.progression, type: 'message', message}});
        }
        case ON_AFTER_QUESTION_EVENT: {
            const {post_countdown_delay} = action;
            console.log('post_countdown_delay', post_countdown_delay);
            return ({...game, progression: {...game.progression, post_countdown_delay}});
        }
        case ON_UPDATED_TALLIES_EVENT: {
            const tallies = action.data;
            console.log('tallies', tallies);
            return ({...game, progression: {...game.progression, tallies}});
        }
        default: {
            return game;
        }
    }
}

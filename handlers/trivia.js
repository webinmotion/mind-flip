const {
    fetchGamesListing,
    fetchGamesByOrganizer,
    fetchGameClocks,
    fetchGameInfo,
    fetchGameInfoById,
    fetchProgression,
    fetchGameLayout,
    fetchGameQuestion,
    fetchGameTallies,
    fetchGameEngine,
    fetchGameParticipants,
    fetchParticipantById,
    fetchParticipantTally,
    fetchPlayerByEmail,
    fetchQuestionChoices,
    createGameHandle,
    updateGameStatus,
    deleteGameHandle,
    createGameEngine,
    updateGameEngine,
    addGameParticipant,
    dropGameParticipant,
    saveResponseToQuestion,
    updateHighestScore,
    searchQuestions,
    upsertGameClock,
    deleteGameClock,
    fetchAllGameMessages,
    upsertGameMessage,
    deleteGameMessage,
    fetchQuestionsByAuthor,
    upsertGameQuestion,
    deleteGameQuestion,
    upsertQuestionChoices,
    deleteGameChoice,
} = require('../service/trivia');

const studio = require("../trivia/GameStudio");
const ScoreKeeper = require("../trivia/ScoreKeeper");
const scorer = new ScoreKeeper();

const handleFetchGamesListing = async function (req, res, next) {
    try {
        const listing = await fetchGamesListing();
        res.json(listing);
    } catch (e) {
        next(e);
    }
}

const handleFetchGamesByOrganizer = async function (req, res, next) {
    try {
        const { organizer } = req.params;
        const listing = await fetchGamesByOrganizer(organizer);
        res.json(listing);
    } catch (e) {
        next(e);
    }
}

const handleFetchGameClocks = async function (req, res, next) {
    try {
        const clocks = await fetchGameClocks();
        res.json(clocks);
    } catch (e) {
        next(e);
    }
}

const handleFetchGameInfo = async function (req, res, next) {
    try {
        const title = req.params.title;
        const organizer = req.params.organizer
        const result = await fetchGameInfo(title, organizer);
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleFetchGameInfoById = async function (req, res, next) {
    try {
        const game_id = req.params.game;
        const result = await fetchGameInfoById(game_id);
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleFetchProgression = async function (req, res, next) {
    try {
        const clock_id = req.params.clock;
        const result = await fetchProgression(clock_id);
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleFetchGameLayout = async function (req, res, next) {
    try {
        const game_id = req.params.game;
        const result = await fetchGameLayout(game_id);
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleFetchGameQuestion = async function (req, res, next) {
    try {
        const que_id = req.params.question;
        const result = await fetchGameQuestion(que_id);
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleFetchQuestionChoices = async function (req, res, next) {
    try {
        const que_id = req.params.question;
        const result = await fetchQuestionChoices(que_id);
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleFetchGameEngine = async function (req, res, next) {
    try {
        const game_fk = req.params.game;
        const result = await fetchGameEngine(game_fk);
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleFetchPlayerByEmail = async function (req, res, next) {
    try {
        const email_address = req.params.email;
        const result = await fetchPlayerByEmail(email_address);
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleFetchPlayerById = async function (req, res, next) {
    try {
        const player_id = req.params.player;
        const result = await fetchPlayerById(player_id);
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleCreateGameHandle = async function (req, res, next) {
    try {
        const { organizer, title } = req.body;
        const created = await createGameHandle({ organizer, title });
        //fetch created game info
        const result = await fetchGameInfoById(created.game_id);
        res.json(result);
        //update clients
        console.log(result);
        studio.sendGameCreatedEvent(result);
    } catch (e) {
        next(e);
    }
}

const handleUpdateGameStatus = async function (req, res, next) {
    //curl -X PUT ${host}/trivia/game/${game_id} -H "Authorization: Bearer ${token}" -H "Content-Type: application/json" -d "{\"game_status\": \"${status}\"}"
    try {
        const { game_id } = req.params;
        const { game_status } = req.body;
        const result = await updateGameStatus(game_id, game_status);
        res.json(result);
        //update clients
        console.log(result);
        studio.sendGameStatusEvent(result);
    } catch (e) {
        next(e);
    }
}

const handleDeleteGameHandle = async function (req, res, next) {
    //curl -X DELETE ${host}/trivia/game/${game_id} -H "Authorization: Bearer ${token}" -H "Content-Type: application/json"
    try {
        const { game_id } = req.params;
        const result = await deleteGameHandle(game_id);
        res.json({ game_id, result });
        //update clients
        console.log(result);
        studio.sendGameDeletedEvent({ game_id });
    } catch (e) {
        next(e);
    }
}

const handleCreateGameEngine = async function (req, res, next) {
    try {
        const game_id = req.params.game;
        const { scheduled_start, progression, is_multi_player, can_navigate_back, server_push_mode, game_clock } = req.body;
        const result = await createGameEngine(game_id, { scheduled_start, progression, is_multi_player, can_navigate_back, server_push_mode, game_clock });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleUpdateGameEngine = async function (req, res, next) {
    try {
        const game_id = req.params.game;
        const { current_section, section_index } = req.body;
        const result = await updateGameEngine(game_id, { current_section, section_index });
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleFetchGameParticipants = async function (req, res, next) {
    try {
        const game_id = req.params.game;
        const result = await fetchGameParticipants(game_id);
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleFetchGameTallies = async function (req, res, next) {
    try {
        const game_id = req.params.game;
        const result = await fetchGameTallies(game_id);
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleFetchParticipantById = async function (req, res, next) {
    try {
        const participant_id = req.params.participant;
        const result = await fetchParticipantById(participant_id);
        res.json(result[0]); //expecting single result
    } catch (e) {
        next(e);
    }
}

const handleFetchParticipantTally = async function (req, res, next) {
    try {
        const participant_id = req.params.participant;
        const result = await fetchParticipantTally(participant_id);
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleAddGameParticipant = async function (req, res, next) {
    try {
        const game_id = req.params.game;
        const player_id = req.params.player;
        const result = await addGameParticipant(game_id, player_id);
        res.json(result);
        //update clients
        console.log('adding participant', result)
        studio.sendAddParticipantEvent(game_id, { participant_id: result.participant_id });
    } catch (e) {
        next(e);
    }
}

const handleDropGameParticipant = async function (req, res, next) {
    try {
        const participant_id = req.params.participant;
        const { game_fk, player_fk } = await dropGameParticipant(participant_id);
        res.status(201).json({ game_fk, player_fk });
        //update clients
        console.log('dropping participant', `game-${game_fk}`, `player-${player_fk}`)
        studio.sendDropParticipantEvent(game_fk, { participant_id });
    } catch (e) {
        next(e);
    }
}

const handleUpdateHighestScore = async function (req, res, next) {
    try {
        const participant_id = req.params.participant;
        const score = req.params.score;
        const result = await updateHighestScore(participant_id, score);
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleUpdateParticipantAnswer = async function (req, res, next) {
    try {
        const { participant, question } = req.params;
        const {
            answer_submitted,
            display_duration,
            max_points,
            score_strategy,
            expected_answer,
            time_remaining,
            points_remaining,
        } = req.body;

        //calculate points for storage
        const scoreStrategy = scorer.strategy[score_strategy];
        let tally_points = scoreStrategy({
            expectedAnswer: expected_answer,
            actualAnswer: answer_submitted,
            maxTime: display_duration,
            maxPoints: max_points,
            timeRemaining: time_remaining,
            pointsRemaining: points_remaining,
        });

        let result = await saveResponseToQuestion(participant, question, {
            answer_submitted,
            clock_remaining: time_remaining,
            tally_points,
        });

        console.log('result from saving response to answer', result);
        res.json(result);
    } catch (e) {
        next(e);
    }
}

const handleSearchQuestions = async function (req, res, next) {
    try {
        const { start_from, fetch_size, author_username, author_screen_name, category } = req.query;
        const criteria = Object.entries({ start_from, fetch_size, author_username, author_screen_name, category })
            .filter(([_, value]) => value !== null && value !== undefined)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
        const page = searchQuestions(criteria);
        console.log('result from questions search', page);
        res.json(page);
    }
    catch (e) {
        next(e);
    }
}

const handleUpsertGameClock = async function (req, res, next) {
    try {
        const { clock_id, clock_title, pre_countdown_delay, countdown_duration, post_countdown_delay, } = req.body;
        const result = await upsertGameClock({ clock_id, clock_title, pre_countdown_delay, countdown_duration, post_countdown_delay, });
        console.log('result from creating a clock', result);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleDeleteGameClock = async function (req, res, next) {
    try {
        const { clock_id, } = req.params;
        const result = await deleteGameClock(clock_id);
        console.log('result from deleting a clock', result);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleFetchAllGameMessages = async function (req, res, next) {
    try {
        const result = await fetchAllGameMessages();
        console.log('result from fetching all messages', result);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleUpsertGameMessage = async function (req, res, next) {
    try {
        const { message_content, display_duration, followed_by, content_type, } = req.body;
        const result = await upsertGameMessage({ message_content, display_duration, followed_by, content_type, });
        console.log('result from updating message', result);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleDeleteGameMessage = async function (req, res, next) {
    try {
        const { message_id, } = req.params;
        const result = await deleteGameMessage(message_id);
        console.log('result from deleting a message', result);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleFetchQuestionsByAuthor = async function(req, res, next) {
    try{
        const { author_id, } = req.params;
        const result = await fetchQuestionsByAuthor(author_id);
        console.log('result from fetching questions by author', result);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleUpsertGameQuestion = async function(req, res, next) {
    try{
        const { que_value, que_answer, answer_reason, category, max_points, has_choices, asked_by, } = req.body;
        const result = await upsertGameQuestion({ que_value, que_answer, answer_reason, category, max_points, has_choices, asked_by, });
        console.log('result from updating a question', result);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleDeleteGameQuestion = async function(req, res, next) {
    try{
        const {question_id} = req.params;
        const result = await deleteGameQuestion(question_id);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleUpsertQuestionChoices = async function(req, res, next) {
    try{
        const {question_id} = req.params;
        const {choice_value, clue, is_correct} = req.body;
        const result = await upsertQuestionChoices({question_id, choice_value, clue, is_correct});
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleDeleteGameChoice = async function(req, res, next) {
    try{
        const {choice_id} = req.params;
        const result = await deleteGameChoice(choice_id);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

module.exports = {
    fetchGamesListing: handleFetchGamesListing,
    fetchGamesByOrganizer: handleFetchGamesByOrganizer,
    fetchGameClocks: handleFetchGameClocks,
    fetchGameInfo: handleFetchGameInfo,
    fetchGameInfoById: handleFetchGameInfoById,
    fetchProgression: handleFetchProgression,
    fetchGameLayout: handleFetchGameLayout,
    fetchGameQuestion: handleFetchGameQuestion,
    fetchQuestionChoices: handleFetchQuestionChoices,
    fetchGameEngine: handleFetchGameEngine,
    fetchPlayerById: handleFetchPlayerById,
    fetchPlayerByEmail: handleFetchPlayerByEmail,
    fetchParticipantById: handleFetchParticipantById,
    createGameHandle: handleCreateGameHandle,
    updateGameStatus: handleUpdateGameStatus,
    deleteGameHandle: handleDeleteGameHandle,
    createGameEngine: handleCreateGameEngine,
    fetchGameParticipants: handleFetchGameParticipants,
    addGameParticipant: handleAddGameParticipant,
    dropGameParticipant: handleDropGameParticipant,
    updateGameEngine: handleUpdateGameEngine,
    fetchParticipantTally: handleFetchParticipantTally,
    fetchGameTallies: handleFetchGameTallies,
    updateHighestScore: handleUpdateHighestScore,
    updateParticipantAnswer: handleUpdateParticipantAnswer,
    searchQuestions: handleSearchQuestions,
    upsertGameClock: handleUpsertGameClock,
    deleteGameClock: handleDeleteGameClock,
    fetchAllGameMessages: handleFetchAllGameMessages,
    upsertGameMessage: handleUpsertGameMessage,
    deleteGameMessage: handleDeleteGameMessage,
    fetchQuestionsByAuthor: handleFetchQuestionsByAuthor,
    upsertGameQuestion: handleUpsertGameQuestion,
    upsertQuestionChoices: handleUpsertQuestionChoices,
    deleteGameChoice: handleDeleteGameChoice,
    deleteGameQuestion: handleDeleteGameQuestion,
}
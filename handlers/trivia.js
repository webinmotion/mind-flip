const {
    fetchGamesListing,
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
} = require('../service/trivia');

const studio = require("../trivia/GameStudio");

const handleFetchGamesListing = async function (rew, res, next) {
    try {
        const listing = await fetchGamesListing();
        res.json(listing);
    }
    catch (e) {
        next(e);
    }
}

const handleFetchGameInfo = async function (req, res, next) {
    try {
        const title = req.params.title;
        const organizer = req.params.organizer
        const result = await fetchGameInfo(title, organizer);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleFetchGameInfoById = async function (req, res, next) {
    try {
        const game_id = req.params.game;
        const result = await fetchGameInfoById(game_id);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleFetchProgression = async function (req, res, next) {
    try {
        const ticker_id = req.params.ticker;
        const result = await fetchProgression(ticker_id);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleFetchGameLayout = async function (req, res, next) {
    try {
        const game_id = req.params.game;
        const result = await fetchGameLayout(game_id);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleFetchGameQuestion = async function (req, res, next) {
    try {
        const que_id = req.params.question;
        const result = await fetchGameQuestion(que_id);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleFetchQuestionChoices = async function (req, res, next) {
    try {
        const que_id = req.params.question;
        const result = await fetchQuestionChoices(que_id);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleFetchGameEngine = async function (req, res, next) {
    try {
        const game_fk = req.params.game;
        const result = await fetchGameEngine(game_fk);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleFetchPlayerByEmail = async function (req, res, next) {
    try {
        const email_address = req.params.email;
        const result = await fetchPlayerByEmail(email_address);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleFetchPlayerById = async function (req, res, next) {
    try {
        const player_id = req.params.player;
        const result = await fetchPlayerById(player_id);
        res.json(result);
    }
    catch (e) {
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
    }
    catch (e) {
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
    }
    catch (e) {
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
    }
    catch (e) {
        next(e);
    }
}

const handleCreateGameEngine = async function (req, res, next) {
    try {
        const game_id = req.params.game;
        const { scheduled_start, progression, display_duration, time_ticker } = req.body;
        const result = await createGameEngine(game_id, { scheduled_start, progression, display_duration, time_ticker });
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleUpdateGameEngine = async function (req, res, next) {
    try {
        const game_id = req.params.game;
        const { current_section, section_index } = req.body;
        const result = await updateGameEngine(game_id, { current_section, section_index });
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleFetchGameParticipants = async function (req, res, next) {
    try {
        const game_id = req.params.game;
        const result = await fetchGameParticipants(game_id);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleFetchGameTallies = async function (req, res, next) {
    try {
        const game_id = req.params.game;
        const result = await fetchGameTallies(game_id);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleFetchParticipantById = async function (req, res, next) {
    try {
        const participant_id = req.params.participant;
        const result = await fetchParticipantById(participant_id);
        res.json(result[0]); //expecting single result
    }
    catch (e) {
        next(e);
    }
}

const handleFetchParticipantTally = async function (req, res, next) {
    try {
        const participant_id = req.params.participant;
        const result = await fetchParticipantTally(participant_id);
        res.json(result);
    }
    catch (e) {
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
    }
    catch (e) {
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
    }
    catch (e) {
        next(e);
    }
}

const handleUpdateHighestScore = async function (req, res, next) {
    try {
        const participant_id = req.params.participant;
        const score = req.params.score;
        const result = await updateHighestScore(participant_id, score);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

module.exports = {
    fetchGamesListing: handleFetchGamesListing,
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
}
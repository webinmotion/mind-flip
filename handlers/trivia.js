const { 
    fetchGamesListing,
    fetchGameInfo,
    fetchProgression,
    fetchGameLayout,
    fetchGameQuestion,
    fetchGameEngine,
    fetchPlayerByEmail,
    createGameEngine,
    updateGameEngine,
    addGameParticipant,
    dropGameParticipant,
    updatePointsTally,
    fetchCummulativeTally,
    updateHighestScore, 
} = require('../service/trivia');

const handleFetchGamesListing = async function(rew, res, next) {
    try{
        const listing = await fetchGamesListing();
        res.json(listing);
    }
    catch(e){
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

const handleAddGameParticipant = async function(req, res, next){
    try {
        const game_id = req.params.game;
        const player_id = req.params.player;
        const result = await addGameParticipant(game_id, player_id);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleDropGameParticipant = async function(req, res, next){
    try {
        const participant_id = req.params.participant;
        const result = await dropGameParticipant(participant_id);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleUpdatePointsTally = async function (req, res, next) {
    try {
        const participant_fk = req.params.participant;
        const question_fk = req.params.question;
        const { answer_submitted, clock_remaining, tally_points } = req.body;
        const result = await updatePointsTally(participant_fk, question_fk, { answer_submitted, clock_remaining, tally_points });
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleFetchCummulativeTally = async function (req, res, next) {
    try {
        const participant_id = req.params.participant;
        const result = await fetchCummulativeTally(participant_id);
        res.json(result);
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
    fetchProgression: handleFetchProgression,
    fetchGameLayout: handleFetchGameLayout,
    fetchGameQuestion: handleFetchGameQuestion,
    fetchGameEngine: handleFetchGameEngine,
    fetchPlayerById: handleFetchPlayerById,
    fetchPlayerByEmail: handleFetchPlayerByEmail,
    createGameEngine: handleCreateGameEngine,
    addGameParticipant: handleAddGameParticipant,
    dropGameParticipant: handleDropGameParticipant,
    updateGameEngine: handleUpdateGameEngine,
    updatePointsTally: handleUpdatePointsTally,
    fetchCummulativeTally: handleFetchCummulativeTally,
    updateHighestScore: handleUpdateHighestScore,
}
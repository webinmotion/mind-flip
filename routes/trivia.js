const express = require('express');
const router = express.Router();
const { 
    fetchGamesListing,
    fetchGamesByOrganizer,
    fetchGameTickers,
    fetchGameInfo,
    fetchGameInfoById,
    fetchProgression,
    fetchGameLayout,
    fetchGameQuestion,
    fetchQuestionChoices,
    fetchGameEngine,
    fetchGameParticipants,
    fetchParticipantById,
    fetchPlayerByEmail,
    createGameHandle,
    updateGameStatus, 
    deleteGameHandle,
    createGameEngine,
    updateGameEngine,
    addGameParticipant,
    dropGameParticipant,
    fetchParticipantTally,
    fetchGameTallies,
    updateHighestScore,
    updateParticipantAnswer,
    searchQuestions,
    upsertGameTicker,
    deleteGameTicker,
    fetchAllGamePlacards,
    upsertGamePlacard,
    deleteGamePlacard,
    fetchQuestionsByAuthor,
    upsertGameQuestion,
    upsertQuestionChoices,
    deleteGameChoice,
} = require('../handlers/trivia');
const { validateAccessToken } = require('../middleware/authorize');
const {remoteDeleteGameChoice} = require("../web-client/services/trivia");

router.get('/listing', fetchGamesListing);

router.get('/:organizer/listing', fetchGamesByOrganizer);

router.get('/ticker', fetchGameTickers);

router.get('/title/:title/organizer/:organizer', validateAccessToken, fetchGameInfo);

router.get('/info/:game', fetchGameInfoById);

router.get('/ticker/:ticker', fetchProgression);

router.get('/layout/:game', fetchGameLayout);

router.get('/question/:question', fetchGameQuestion);

router.get('/question/:question/choices', fetchQuestionChoices);

router.get('/engine/:game', fetchGameEngine);

router.get('/player/:email', fetchPlayerByEmail);

router.post('/game', validateAccessToken, createGameHandle);

router.put('/game/:game_id', validateAccessToken, updateGameStatus);

router.delete('/game/:game_id', validateAccessToken, deleteGameHandle);

router.post('/engine/:game', validateAccessToken, createGameEngine);

router.put('/engine/:game', validateAccessToken, updateGameEngine);

router.get('/participant/:game', fetchGameParticipants);

router.get('/participant/:participant/details', fetchParticipantById);

router.put('/participant/:game/player/:player', addGameParticipant);

router.delete('/participant/:participant', dropGameParticipant);

router.get('/participant/:participant/score', fetchParticipantTally);

router.get('/game/:game/scores', fetchGameTallies);

router.put('/participant/:participant/highscore/:score', updateHighestScore);

router.post('/game/:game/participant/:participant/question/:question/answer', updateParticipantAnswer);

router.get('/question/search', searchQuestions);

router.post('/ticker', upsertGameTicker);

router.delete('/ticker/:ticker_id', deleteGameTicker);

router.get('/placard', fetchAllGamePlacards);

router.post('/placard', upsertGamePlacard);

router.delete('/placard/:placard_id', deleteGamePlacard);

router.get('/question/author/:author_id', fetchQuestionsByAuthor);

router.post('/question', upsertGameQuestion);

router.post('/question/:question_id/choices', upsertQuestionChoices);

router.delete('/question/choices/:choice_id', deleteGameChoice);

module.exports = router;

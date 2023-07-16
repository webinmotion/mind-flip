const express = require('express');
const router = express.Router();
const { 
    fetchGamesListing,
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
    respondToQuestion,
    fetchCumulativeTally,
    updateHighestScore,
} = require('../handlers/trivia');
const { validateAccessToken } = require('../middleware/authorize');

router.get('/listing', fetchGamesListing);

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

router.put('/participant/:participant/question/:question', respondToQuestion);

router.get('/participant/:participant/score', fetchCumulativeTally);

router.put('/participant/:participant/highscore/:score', updateHighestScore);

module.exports = router;

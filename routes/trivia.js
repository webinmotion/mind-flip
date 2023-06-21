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
    fetchPlayerByEmail,
    createGameHandle,
    createGameEngine,
    updateGameEngine,
    addGameParticipant,
    dropGameParticipant,
    updatePointsTally,
    fetchCummulativeTally,
    updateHighestScore, 
} = require('../handlers/trivia');

router.get('/listing', fetchGamesListing);

router.get('/title/:title/organizer/:organizer', fetchGameInfo);

router.get('/info/:game', fetchGameInfoById);

router.get('/ticker/:ticker', fetchProgression);

router.get('/layout/:game', fetchGameLayout);

router.get('/question/:question', fetchGameQuestion);

router.get('/question/:question/choices', fetchQuestionChoices);

router.get('/engine/:game', fetchGameEngine);

router.get('/player/:email', fetchPlayerByEmail);

router.post('/game', createGameHandle);

router.post('/engine/:game', createGameEngine);

router.put('/engine/:game', updateGameEngine);

router.put('/participant/:game/player/:player', addGameParticipant);

router.delete('/participant/:participant', dropGameParticipant);

router.put('/participant/:participant/question/:question', updatePointsTally);

router.get('/participant/:participant/score', fetchCummulativeTally);

router.put('/participant/:participant/highscore/:score', updateHighestScore);

module.exports = router;

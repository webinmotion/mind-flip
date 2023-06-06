const express = require('express');
const router = express.Router();
const { 
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
} = require('../handlers/trivia');

router.get('/title/:title/organizer/:organizer', fetchGameInfo);

router.get('/ticker/:ticker', fetchProgression);

router.get('/layout/:game', fetchGameLayout);

router.get('/question/:question', fetchGameQuestion);

router.get('/engine/:game', fetchGameEngine);

router.get('/player/:email', fetchPlayerByEmail);

router.post('/engine/:game', createGameEngine);

router.put('/engine/:game', updateGameEngine);

router.put('/participant/:game/player/:player', addGameParticipant);

router.delete('/participant/:participant', dropGameParticipant);

router.put('/participant/:participant/question/:question', updatePointsTally);

router.get('/participant/:participant/score', fetchCummulativeTally);

router.put('/participant/:participant/highscore/:score', updateHighestScore);

module.exports = router;

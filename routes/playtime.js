const express = require('express');
const router = express.Router();
const { enrollDriver, enrollPlayer, sendTestMessage, 
    handleGamesListing, handleParticipantEvents, handleProgressionEvents, handleNextQuestionEvent, handleAnswerPostedEvent, } = require('../handlers/playtime');
const { validateOrganizerAuth } = require('../middleware/authorize');

/* GET listen for game listing events */
router.get('/', handleGamesListing);

/* POST send testing message */
router.post('/test/:event', sendTestMessage);

/* POST enroll player */
router.post('/game/:game/player/:player', enrollPlayer);

/* POST enroll new game */
router.post('/game/:game', /*validateOrganizerAuth,*/ enrollDriver);

/* GET listen for participant joining and exiting events */
router.get('/game/:game/player/:player', handleParticipantEvents);

/** GET listen for game progression events */
router.get('/client/:game/player/:player', handleProgressionEvents);

/** POST push next question event */
router.post('/client/:game/question', /*validateOrganizerAuth,*/ handleNextQuestionEvent);

/** POST submit response to question */
router.post('/client/:game/player/:player/question/:question/answer', handleAnswerPostedEvent);

module.exports = router;

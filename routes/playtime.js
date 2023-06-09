const express = require('express');
const router = express.Router();
const { enrollDriver, enrollPlayer, sendTestMessage, 
    handleGamesListing, handleParticipantEvents, handlePushGameQuestion, } = require('../handlers/playtime');
const { validateOrganizerAuth } = require('../middleware/authorize');

/* GET listen for game listing events */
router.get('/', handleGamesListing);

/* POST send testing message */
router.post('/test/:event', sendTestMessage);

/* POST enroll player */
router.post('/game/:game/player/:player', enrollPlayer);

/* POST enroll new game */
router.post('/title/:title/organizer/:organizer', validateOrganizerAuth, enrollDriver);

/* GET listen for participant joining and exiting events */
router.get('/game/:game/player/:player', handleParticipantEvents);

/** GET push game question for broadcasting to game participants */
router.get('/push/:game/question/:question', handlePushGameQuestion)

module.exports = router;

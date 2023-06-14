const express = require('express');
const router = express.Router();
const { enrollDriver, enrollPlayer, handleGameEvents, } = require('../handlers/playtime');
const { organizerAuth } = require('../middleware/authorize');

/* POST enroll player */
router.post('/game/:game/player/:player', enrollPlayer);

/* POST enroll new game */
router.post('/title/:title/organizer/:organizer', organizerAuth, enrollDriver);

/* GET handle play events */
router.get('/game/:game/participant/:participant', handleGameEvents);

module.exports = router;

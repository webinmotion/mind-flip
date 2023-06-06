const express = require('express');
const router = express.Router();
const { enrollDriver, enrollPlayer, handleGameEvents, } = require('../handlers/playtime');

/* POST enroll player */
router.post('/game/:game/player/:player', enrollPlayer);

/* POST entoll new game */
router.post('/title/:title/organizer/:organizer', enrollDriver);

/* GET handle play events */
router.get('/game/:game/participant/:participant', handleGameEvents);

module.exports = router;

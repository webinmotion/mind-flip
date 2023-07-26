const express = require('express');
const router = express.Router();
const { validateUserAuth } = require('../middleware/authorize');
const { decodeCookieToken, refreshAccessToken } = require('../handlers/auth');

router.get('/decode-token', validateUserAuth, decodeCookieToken);

router.get('/refresh-token', refreshAccessToken);

module.exports = router;
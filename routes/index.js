const express = require('express');
const router = express.Router();
const homeRouter = require('./home');
const triviaRouter = require('./trivia');
const accountRouter = require('./account');
const playtimeRouter = require('./playtime');

router.use('/', homeRouter);

router.use('/trivia', triviaRouter);

router.use('/play', playtimeRouter);

router.use('/account', accountRouter);

module.exports = router;

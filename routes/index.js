const express = require('express');
const router = express.Router();
const homeRouter = require('./home');
const triviaRouter = require('./trivia');
const accountRouter = require('./account');
const playtimeRouter = require('./playtime');
const authRouter = require('./auth');

router.use('/', homeRouter);

router.use('/account', accountRouter);

router.use('/trivia', triviaRouter);

router.use('/play', playtimeRouter);

router.use('/auth', authRouter);

module.exports = router;

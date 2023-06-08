const express = require('express');
const router = express.Router();
const homeRouter = require('./home');
const pagesRouter = require('./pages');
const triviaRouter = require('./trivia');
const playtimeRouter = require('./playtime');

router.use('/', homeRouter);

router.use('/trivia', triviaRouter);

router.use('/play', playtimeRouter);

router.use('/pages', pagesRouter);

module.exports = router;

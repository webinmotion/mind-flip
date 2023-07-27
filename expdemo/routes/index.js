const express = require('express');
const router = express.Router();
const homeRouter = require('./home');
const dataRouter = require('./data');
const mfaHandler = require('./mfa');

router.use('/', homeRouter);
router.use('/data', dataRouter);
router.use('/mfa', mfaHandler);

module.exports = router;
const express = require('express');
const router = express.Router();
const homeRouter = require('./home');
const dataRouter = require('./data');

router.use('/', homeRouter);
router.use('/data', dataRouter);

module.exports = router;
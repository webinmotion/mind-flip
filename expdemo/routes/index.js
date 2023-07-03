const express = require('express');
const router = express.Router();
const homeRouter = require('./home');
const usersRouter = require('./users');

router.use('/', homeRouter);
router.use('/users', usersRouter);
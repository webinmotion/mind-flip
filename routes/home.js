const express = require('express');
const router = express.Router();
const { homePage, healthCheck  } = require('../handlers/home');

router.get(['/', '/quickvote'], homePage);

router.get('/health', healthCheck);

module.exports = router;

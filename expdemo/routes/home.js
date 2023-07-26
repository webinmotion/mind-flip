const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

function homePage(req, res, next) {
  try {
    const content = fs.readFileSync(path.join(process.cwd(), 'public/index.html'), { encoding: 'utf8', flag: 'r' })
    res.send(content);
  }
  catch (e) {
    next(e);
  }
}

function healthCheck(req, res, next) {
  try {
    res.send(`${process.env.HEALTHY_MESSAGE}\n`);
  }
  catch (e) {
    next(e);
  }
}

router.get('/', homePage);

router.get('/health', healthCheck);

module.exports = router;
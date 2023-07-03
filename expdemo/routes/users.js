var express = require('express');
var router = express.Router();

function handleGetUsers(req, res, next) {
  res.send('respond with a resource');
}

/* GET users listing. */
router.get('/', handleGetUsers);

module.exports = router;

const express = require('express');
const router = express.Router();
const {handleResource, handleLogin, handleShowCookie, handleLogout} = require('../handlers/data');

router.get('/', handleResource);
router.get('/login', handleLogin);
router.get('/cookie', handleShowCookie);
router.get('/logout', handleLogout);

module.exports = router;

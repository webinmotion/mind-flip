const express = require('express');
const router = express.Router();
const { verifyLoginAttempt, registerNewPlayer, registerNewAccount, resetLoginPassword, 
    verifyRegistrationEmail, resetVerificationCode, dropGuestPlayer } = require('../handlers/account');
const { password_encrypt } = require('../middleware/encrypt');

router.post('/player', registerNewPlayer);

router.delete('/player/:screen_name', dropGuestPlayer);

router.get('/verify', verifyRegistrationEmail);

router.delete('/verify', resetVerificationCode);

router.post('/register', password_encrypt, registerNewAccount);

router.post('/login', verifyLoginAttempt);

router.put('/reset', password_encrypt, resetLoginPassword);

module.exports = router;

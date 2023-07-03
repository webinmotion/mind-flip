const express = require('express');
const router = express.Router();
const { verifyLoginAttempt, registerNewPlayer, registerNewAccount, resetLoginPassword, 
    verifyRegistrationEmail, resetVerificationCode, dropGuestPlayer, accountLogout, accountRecover,
    fetchPlayerById, } = require('../handlers/account');
const { password_encrypt } = require('../middleware/encrypt');
const { validateAccessToken } = require('../middleware/authorize');

router.post('/player', registerNewPlayer);

router.delete('/player/:screen_name', dropGuestPlayer);

router.get('/verify', verifyRegistrationEmail);

router.delete('/verify', resetVerificationCode);

router.post('/register', password_encrypt, registerNewAccount);

router.post('/login', verifyLoginAttempt);

router.get('/:username/logout', validateAccessToken, accountLogout);

router.put('/reset', password_encrypt, resetLoginPassword);

router.get('/:email_address/recover', accountRecover);

router.get('/player/:player_id', fetchPlayerById);

module.exports = router;

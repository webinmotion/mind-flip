const express = require('express');
const router = express.Router();
const {handleRegister, handleQrcode, handleVerify, handleValidate} = require('../handlers/mfa');

router.post('/register', handleRegister);

router.get('/qrcode/:auth_url', handleQrcode);

router.get('/verify/:id/code/:mfa_code', handleVerify);

router.get('/validate/:id/code/:mfa_code', handleValidate);

module.exports = router;

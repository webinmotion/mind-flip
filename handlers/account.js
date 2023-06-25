const { registerNewAccount, verifyLoginAttempt, resetLoginPassword, dropGuestPlayer, registerNewPlayer,
    verifyRegistrationEmail, resetVerificationCode } = require('../service/account');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const handleRegisterNewPlayer = async function (req, res, next) {
    try {
        const { screen_name, email_address, player_type, city, state, country } = req.body;
        const details = await registerNewPlayer({ screen_name, email_address, city, state, country, player_type })
        res.json(details);
    }
    catch (e) {
        next(e);
    }
}

const handleRegisterNewAccount = async function (req, res, next) {
    try {
        const { username, email_address } = req.body;
        const { userpass } = req.locals;

        const details = await registerNewAccount({ username, userpass, email_address });
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
            { player_id: details.player_id, username, role: details.account_role },
            jwtSecret,
            {
                expiresIn: maxAge, // 3hrs in sec
            }
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
        });

        res.json({
            message: "User successfully created",
            token,
        });
    }
    catch (e) {
        next(e);
    }
}

const handleVerifyLoginAttempt = async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await verifyLoginAttempt({ username, password });
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
            { player_id: user.player_id, username, role: user.account_role },
            jwtSecret,
            {
                expiresIn: maxAge, // 3hrs in sec
            }
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
        });

        res.json({
            message: "User successfully logged in",
            user,
        });
    }
    catch (e) {
        next(e);
    }
}

const handleVerifyRegistrationEmail = async function (req, res, nest) {
    try {
        const { email_address, verification_code } = req.query;
        const result = await verifyRegistrationEmail({ email_address, verification_code });
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleResetVerificationCode = async function (req, res, next) {
    try {
        const { email_address } = req.query;
        const result = await resetVerificationCode(email_address);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleResetLoginPassword = async function (req, res, next) {
    try {
        const { username } = req.body;
        const { userpass } = req.locals;
        const result = await resetLoginPassword({ username, password: userpass });
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleDropGuestPlayer = async function (req, res, next) {
    try {
        const screen_name = req.params.screen_name;
        const result = await dropGuestPlayer(screen_name);
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleAccountLogout = async function (req, res, next) {
    try {
        const username = req.params.username;
        const result = { username } //TODO: figure out what needs to be cleaned up and what the response needs to be
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

const handleAccountRecover = async function (req, res, next) {
    try {
        const email_address = req.params.email_address;
        const result = { email_address } //TODO: figure out what needs to be cleaned up and what the response needs to be
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}

module.exports = {
    registerNewPlayer: handleRegisterNewPlayer,
    registerNewAccount: handleRegisterNewAccount,
    verifyLoginAttempt: handleVerifyLoginAttempt,
    resetLoginPassword: handleResetLoginPassword,
    dropGuestPlayer: handleDropGuestPlayer,
    verifyRegistrationEmail: handleVerifyRegistrationEmail,
    resetVerificationCode: handleResetVerificationCode,
    accountLogout: handleAccountLogout,
    accountRecover: handleAccountRecover,
}
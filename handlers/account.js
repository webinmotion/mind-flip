const { registerNewAccount, verifyLoginAttempt, resetLoginPassword, dropGuestPlayer, registerNewPlayer,
    verifyRegistrationEmail, resetVerificationCode, fetchPlayerById, } = require('../service/account');
const { signAccessToken, signRefreshToken, cookieOptions, } = require('../middleware/jwt-tokens');

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
        res.json(details);
    }
    catch (e) {
        next(e);
    }
}

const handleVerifyLoginAttempt = async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const { account_id, is_active, player_fk, account_role } = await verifyLoginAttempt({ username, password });
        const userInfo = { username, is_active, player_id: player_fk, role: account_role };

        const accessToken = signAccessToken(userInfo, account_id);
        const refreshToken = signRefreshToken(userInfo, account_id);

        //TODO: consider saving refresh token in a database or cache for invalidation purposes
        console.log(refreshToken);

        //respond with the tokens
        res.cookie("jwt", { refreshToken }, cookieOptions());

        res.json({
            message: "User successfully logged in",
            userInfo,
            accessToken,
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

const handleFetchPlayerById = async function (req, res, next) {
    try {
        const { player_id } = req.params;
        const result = await fetchPlayerById(player_id);
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
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204); //No Content

        //TODO: clear refresh token from database or cache, if one was saved
        const refreshToken = cookies.jwt;
        console.log(refreshToken);

        //clear cookies
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'None',
            secure: true
        });
        res.sendStatus(204);
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
    fetchPlayerById: handleFetchPlayerById,
    dropGuestPlayer: handleDropGuestPlayer,
    verifyRegistrationEmail: handleVerifyRegistrationEmail,
    resetVerificationCode: handleResetVerificationCode,
    accountLogout: handleAccountLogout,
    accountRecover: handleAccountRecover,
}
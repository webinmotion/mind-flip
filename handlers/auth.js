const { signAccessToken, signRefreshToken, verifyRefreshToken, cookieOptions, } = require('../middleware/jwt-tokens');

const decodeCookieToken = async function (req, res, next) {
    try {
        const user = req.user;
        res.json(user);
    }
    catch (e) {
        next(e);
    }
}

const refreshAccessToken = async function (req, res, next) {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.status(401).send("No refresh token detected");
        const { refreshToken } = cookies.jwt;

        verifyRefreshToken(refreshToken, (err, decodedToken) => {
            if (err) {
                return res.status(403).json({ message: "Token is not valid. User not authorized" })
            } else {
                const { username, is_active, player_id, role, aud } = decodedToken;
                const userInfo = { username, is_active, player_id, role };
                const accessToken = signAccessToken(userInfo, aud);
                const newRefreshToken = signRefreshToken(userInfo, aud);

                res.cookie("jwt", { refreshToken: newRefreshToken }, cookieOptions());

                res.json({ userInfo, accessToken });
            }
        })
    }
    catch (e) {
        next(e);
    }
}

module.exports = {
    decodeCookieToken,
    refreshAccessToken,
}
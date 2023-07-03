const jwt = require('jsonwebtoken');
const tokenIssuer = "mind-flip";
const accessTokenAge = 60 * 60; // 1hr in sec,
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenAge = '1y'; //1 year
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const cookieOptions = () => {
    return ({
        httpOnly: true,
        sameSite: 'None',
        secure: process.env.NODE_ENV === 'production',
        maxAge: (60 * 60) * 1000, // 1hrs in ms
    })
};

function signAccessToken(data, audience) {
    return jwt.sign(
        data,
        accessTokenSecret,
        {
            expiresIn: accessTokenAge,
            issuer: tokenIssuer,
            audience,
        }
    );
}

function signRefreshToken(data, audience) {
    return jwt.sign(
        data,
        refreshTokenSecret,
        {
            expiresIn: refreshTokenAge,
            issuer: tokenIssuer,
            audience,
        }
    );
}

function verifyAccessToken(token, onCompletion){
    jwt.verify(token, accessTokenSecret, onCompletion);
}

function verifyRefreshToken(token, onCompletion){
    jwt.verify(token, refreshTokenSecret, onCompletion);
}

module.exports = {
    cookieOptions,
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
}
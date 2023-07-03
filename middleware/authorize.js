const { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken, } = require('./jwt-tokens');

const BASIC_ROLE = "Basic";
const ORGANIZER_ROLE = "Organizer";
const ADMIN_ROLE = "Administrator";

const validateAccessRole = (...allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Not authorized, token not available" })
    }

    const token = authHeader?.split(' ')[1];
    verifyAccessToken(token, (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid." })
      }

      if (!allowedRoles.includes(decodedToken.role)) {
        return res.status(401).json({ message: "Unexpected role. User not authorized" })
      } else {
        req.user = decodedToken
        next()
      }
    })
  }
}

const validateAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Not authorized, token not available" })
  }

  const accessToken = authHeader?.split(' ')[1];
  verifyAccessToken(accessToken, (err, decodedToken) => {
    if (err) {
      return res.status(403).send("Invalid access token");
    }

    const { username, is_active, player_id, role, aud } = decodedToken;
    req.user = {username, is_active, player_id, role, account_id: aud};
    next()
  });
}

module.exports = {
  validateUserAuth: validateAccessRole(BASIC_ROLE),
  validateOrganizerAuth: validateAccessRole(ORGANIZER_ROLE),
  validateAdminAuth: validateAccessRole(ADMIN_ROLE),
  validateAccessToken
};
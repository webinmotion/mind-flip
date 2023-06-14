const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET;

const BASIC_ROLE = "Basic";
const ORGANIZER_ROLE = "Organizer";
const ADMIN_ROLE = "Administrator";

const authCookieHandler = (role) => {
  return (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          if (decodedToken.role !== role) {
            return res.status(401).json({ message: "Not authorized" })
          } else {
            req.user = decodedToken.user
            next()
          }
        }
      })
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" })
    }
  }
}

const authHeaderHandler = (role) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          if (decodedToken.role !== role) {
            return res.status(401).json({ message: "Not authorized" })
          } else {
            req.user = decodedToken.user
            next()
          }
        }
      })
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" })
    }
  }
}

exports.userAuth = authCookieHandler(BASIC_ROLE);

exports.organizerAuth = authCookieHandler(ORGANIZER_ROLE);

exports.adminAuth = authCookieHandler(ADMIN_ROLE);
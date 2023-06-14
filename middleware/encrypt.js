const bcrypt = require("bcryptjs");

exports.password_encrypt = async (req, res, next) => {
    const { password } = req.body;

    bcrypt.hash(password, 10).then(async (hash) => {
        req.locals = { userpass: hash };
        next();
    })
        .catch(error => {
            next(error);
        })
}
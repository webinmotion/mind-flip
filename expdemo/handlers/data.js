exports.handleResource = function (req, res, next) {
    res.send('respond with a resource');
}

exports.handleLogin = function (req, res, next) {
    // setting cookie using cookie-parser middleware
    const date = new Date();
    date.setHours(date.getHours() + 1);
    res.cookie('isLoggedIn', true, {
        secure: true,
        httpOnly: true,
        expires: date,
        domain: 'localhost',
        sameSite: 'strict',
    });

    res.send('Your are logged in');
}

exports.handleShowCookie = function (req, res, next) {
    const cookies = req.cookies;
    res.json(cookies);
}

exports.handleLogout = function (req, res, next) {
    res.clearCookie('isLoggedIn');
    res.send('You are logged out');
}
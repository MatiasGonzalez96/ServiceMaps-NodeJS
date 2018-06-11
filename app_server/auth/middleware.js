const isAuthenticated = function (req, res, next) {

    if (req.isAuthenticated() && req.user.editor)
        return next();

    res.redirect('/');
}
module.exports = isAuthenticated;

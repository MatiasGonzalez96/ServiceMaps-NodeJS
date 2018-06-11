var express = require('express');
var router = express.Router();
var passport = require('passport');

const auth = require('../controllers/auth');

router.get('/facebook', auth.login);

router.get('/facebook/redirect', passport.authenticate('facebook'),(req, res) => {
    res.redirect('/');
});

router.get('/facebook/callback', auth.facebookCallback);

router.get('/logout', auth.logout);

module.exports = router;

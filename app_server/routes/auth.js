var express = require('express');
var router = express.Router();
var passport = require('passport');

const auth = require('../controllers/auth');


router.get('/facebook', auth.facebook);
router.get('/facebook/callback', auth.facebookAuth, auth.facebookCallback);

router.get('/logout', auth.logout);

module.exports = router;

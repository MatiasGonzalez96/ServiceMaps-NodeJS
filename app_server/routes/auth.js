var express = require('express');
var router = express.Router();
var passport = require('passport');

const auth = require('../controllers/auth');

router.get('/auth/facebook', auth.facebook);
router.get('/auth/facebook/callback', auth.facebookAuth, auth.facebookCallback);

module.exports = router;

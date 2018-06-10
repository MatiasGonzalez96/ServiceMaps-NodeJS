var passport = require('passport');

const getRegister = function(req, res) {
    res.render('register');
};

const login = passport.authenticate('facebook', {scope: ['email']});

const redirect = (passport.authenticate('facebook'),
  function(req, res) {
    res.redirect('/');
  });

const logout = function(req, res) {
      req.logout();
      res.redirect('/');
  };

const facebook = passport.authenticate('facebook', {scope: ['email']});

const facebookAuth = passport.authenticate('facebook', {failureRedirect: '/'});

const facebookCallback = function(req, res) {
  res.redirect('/');
};

module.exports = {
   login, redirect, logout, facebook, facebookAuth, facebookCallback
};

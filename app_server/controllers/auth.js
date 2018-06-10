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

module.exports = {
   login, redirect, logout
};

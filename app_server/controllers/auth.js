var passport = require('passport');

const login = passport.authenticate('facebook', {scope: ['email']});

const redirect = (passport.authenticate('facebook'),
  function(req, res) {
    res.redirect('/');
  });

const facebookCallback = passport.authenticate('facebook', { successRedirect: 'https://servicemaps.herokuapp.com/'+req.url, failureRedirect: '/'});

const logout = function(req, res) {
      req.logout();
      res.redirect('https://servicemaps.herokuapp.com/'+req.url);

  };

module.exports = {
   login, redirect, logout, facebookCallback
};

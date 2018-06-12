var passport = require('passport');

const login = passport.authenticate('facebook', {scope: ['email']});

const redirect = (passport.authenticate('facebook'),
  function(req, res) {
    res.redirect('/');
  });

const facebookCallback = passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/'});

const logout = function(req, res) {
      req.logout();
      var ruta = 'https://servicemaps.herokuapp.com/'+req.url;
      console.log(ruta);
      res.redirect(ruta);

  };

module.exports = {
   login, redirect, logout, facebookCallback
};

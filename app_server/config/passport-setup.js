var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new FacebookStrategy({
    clientID: '1071078366372805',
    clientSecret: '9a416635622646a3d42f8124302ed008',
    callbackURL: 'https://servicemaps.herokuapp.com/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    	process.nextTick(function(){
    		User.findOne({'id': profile.id}, function(err, user){
    			if(err)
    				return done(err);
    			if(user)
    				return done(null, user);
    			else {
    				var newUser = new User();
    				newUser.id = profile.id;
    				newUser.name = profile.displayName;
    				newUser.email = profile.emails[0].value;

    				newUser.save(function(err){
    					if(err)
    						throw err;
    					return done(null, newUser);
    				})
    				console.log(profile);
    			}
    		});
    	});
    }

));

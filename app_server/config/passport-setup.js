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
    callbackURL: 'https://servicemaps.herokuapp.com/auth/facebook/callback',
    profileFields: ['id', 'displayName','emails']
  },
  function(accessToken, refreshToken, profile, done) {
    	process.nextTick(function(){
    		User.findOne({'facebookID': profile.id}, function(err, user){
    			if(err)
    				return done(err);
    			if(user)
    				return done(null, user);
    			else {
    				newUser = new User({
                        facebookID: profile.id,
                        facebookEmail: profile.emails[0].value,
                        facebookName: profile.displayName
                    });

                    newUser.save(function(err, newUser) {
                        if(err) return done(err);
                        done(null, newUser);
                    });
    			}
    		});
    	});
    }

));

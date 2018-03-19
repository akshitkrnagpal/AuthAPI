const passport = require('passport');
const User = require('../models/user');
const config = require('./index');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

passport.initialize();

const localOptions = {
	usernameField: 'email',
};

const localLogin = new LocalStrategy(localOptions, function(email, password, done)  {
	User.findOne({ email: email }, function(error, user) {
		if(error) {
			return done(error);
		}
		if(!user) {
			return done(null, false, { error: 'Your login details could not be verified. Please try again.'});
		}
		user.comparePassword(password, function(error, isMatch) {
			if(error) {
				done(error);
			}
			if(!isMatch) {
				return done(null, false, { error: 'Your login details could not be verified. Please try again.'});		
			}
			return done(null, user);
		});
	});
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	User.findById(payload.__id, function (error, user) {
		if(error) {
			return done(error, false);
		}
		if(user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	});
});

passport.use(localLogin);
passport.use(jwtLogin);
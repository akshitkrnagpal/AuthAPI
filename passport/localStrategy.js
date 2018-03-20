const User = require('../models/user');
const LocalStrategy = require('passport-local');

const localOptions = {
	usernameField: 'email',
};

const localLogin = new LocalStrategy(localOptions, function(email, password, callback)  {
	User.findOne({ email: email }, function(error, user) {
		if(error) {
			return callback(error);
		}
		if(!user) {
			return callback(null, false, { error: 'Your login details could not be verified. Please try again.'});
		}
		user.comparePassword(password, function(error, isMatch) {
			if(error) {
				callback(error);
			}
			if(!isMatch) {
				return callback(null, false, { error: 'Your login details could not be verified. Please try again.'});		
			}
			return callback(null, user);
		});
	});
});

module.exports = localLogin;
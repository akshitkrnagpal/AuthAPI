const JwtPassport = require('passport-jwt');

const JwtStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const config = require('../config');

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, callback) {
	User.findById(payload.__id, function (error, user) {
		if(error) {
			return callback(error, false);
		}
		if(user) {
			return callback(null, user);
		} else {
			return callback(null, false);
		}
	});
});

module.exports = jwtLogin;
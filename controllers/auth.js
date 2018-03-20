const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const config = require('../config');

function generateToken(user) {
	return jwt.sign(user, config.SECRET, {
		expiresIn: 10080,
	})
}

function setUserInfo(request) {
	return {
		__id: request.__id,
		email: request.email,
	}
}

exports.login = function(req, res, next) {

	const email = req.body.email;
	const password = req.body.password;

	User.findOne( { email: email }, function(error, user) {
		
		if(error) {
			return next(error);
		}

		if(!user) {
			return res.status(200).send({ error: 'Incorrect Credentials.'});
		}

		user.comparePassword(password, function (error, isMatch) {
			
			if(error) {
				return next(error);		
			}

			if(isMatch) {

				let userInfo = setUserInfo(user);

				return res.status(200).json({
					token: 'JWT '+ generateToken(userInfo),
					user: userInfo,
				});

			} else {
				return res.status(200).send({ error: 'Incorrect Credentials.'});
			}

		});
	})
}

exports.register = function(req, res, next) {

	const email = req.body.email;
	const password = req.body.password;

	if(!email) {
		return res.status(422).send({ error: 'You must provide an email.' });
	}

	if(!password) {
		return res.status(422).send({ error: 'You must provide a password.' });
	}

	User.findOne({ email: email }, function(error, existingUser) {
		
		if(error) {
			return next(error);
		}
		
		if(existingUser) {
			return res.status(422).send({ error: 'Email address already in use.' });
		}

		let user = new User({
			email: email,
			password: password,
		});

		user.save( function(error, user) {
			
			if(error) {
				return next(error);
			}

			let userInfo = setUserInfo(user);

			return res.status(200).json({
				token: 'JWT '+ generateToken(userInfo),
				user: userInfo,
			});
		});
	});
}
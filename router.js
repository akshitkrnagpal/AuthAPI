const AuthenticationController = require('./controllers/auth');
const express = require('express');
const passportService = require('./passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session:false });
const requireLogin = passport.authenticate('local', { session:false });

module.exports = function(app) {

	const apiRoutes = express.Router();
	const authRoutes = express.Router();

	authRoutes.post('/register', AuthenticationController.register);
	authRoutes.post('/login', requireLogin, AuthenticationController.login);

	apiRoutes.use('/auth', authRoutes);

	apiRoutes.use('/api', apiRoutes);

	app.use(apiRoutes);

}
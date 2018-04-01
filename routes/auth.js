const express = require('express');
const AuthenticationController = require('../controllers/auth');
const passportService = require('../passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session:false });
const requireLogin = passport.authenticate('local', { session:false });

const authRoutes = express.Router();

authRoutes.post('/register', AuthenticationController.register);
authRoutes.post('/login', requireLogin, AuthenticationController.login);

module.exports = authRoutes;
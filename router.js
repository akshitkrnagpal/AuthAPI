const express = require('express');

const authRoutes = require('./routes/auth');

module.exports = function(app) {

	const apiRoutes = express.Router();
	
	apiRoutes.use('/auth', authRoutes);

	apiRoutes.use('/api', apiRoutes);

	app.use(apiRoutes);

}
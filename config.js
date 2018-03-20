
// Application wide secret for signing 
const SECRET = 'secret';

// Mongo database connection url
const DATABASE_URL = 'mongodb://localhost:27017';

// Port on which app will run
const PORT = process.env.PORT || 3000;

module.exports = {
	SECRET,
	DATABASE_URL,
	PORT,
}

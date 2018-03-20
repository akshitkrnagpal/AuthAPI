const passport = require('passport');

const localLogin = require('./localStrategy');
const jwtLogin = require('./jwtStrategy');

passport.initialize();

passport.use(localLogin);
passport.use(jwtLogin);

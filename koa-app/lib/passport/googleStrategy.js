const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: 'gg id',
    clientSecret: 'sectet',
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, { accessToken,refreshToken, profile})
  }
));
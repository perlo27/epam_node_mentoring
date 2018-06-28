const passport = require('koa-passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: 1578957375546463,
    clientSecret: 'b6dc44120de994e02e22272edc688d0d',
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    done(null, { accessToken,refreshToken, profile})
  }
));
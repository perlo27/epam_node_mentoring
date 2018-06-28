const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
import {fetchUser} from './mock';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function(username, password, done) {
      fetchUser()
        .then(user => {
          if (username === user.username && password === user.password) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch(err => done(err));
    }
  )
);

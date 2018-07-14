const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
import { db } from '../../db';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async function(username, password, done) {
      try {
        const user = await db.User.findOne({ where: { username } });
        if (!user || password !== user.password) {
          return done(null, false);
        }
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

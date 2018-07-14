const passport = require('koa-passport');
import { db } from '../../db';

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await db.User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const passport = require('koa-passport');
import {fetchUser} from './mock';

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await fetchUser('id', id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
const passport = require('koa-passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import { secret } from '../../helpers/jwt';
import { db } from '../../db';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

passport.use(
  new JwtStrategy(opts, async function({ id }, done) {
    try {
      const user = await db.User.findById(id);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

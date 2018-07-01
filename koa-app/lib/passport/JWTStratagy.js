const passport = require('koa-passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import {fetchUser} from './mock';
import { secret } from '../../helpers/jwt';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : secret,
};

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  fetchUser('id', jwt_payload.id)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => done(err));
}));
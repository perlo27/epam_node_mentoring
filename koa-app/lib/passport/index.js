const passport = require('koa-passport');

import './serialize';

import './localStrategy';
import './facebookStrategy';
import './googleStrategy';
import './JWTStratagy';

module.exports = passport;

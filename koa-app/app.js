import Koa from 'koa';
import session from 'koa-session';
import logger from 'koa-logger';
import passport from  'koa-passport';
import cors from 'koa-cors';
const convert = require('koa-convert');

import router from './routes'
import bodyparser from './middlewares/bodyparser';
import errors from './middlewares/errors';

import sequelize from './db';

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const app = new Koa();

app.keys = ['some-secret'];


app.use(logger());
app.use(convert(cors()));
app.use(session({secret: 'some-secret'}, app));
app.use(bodyparser);
app.use(errors);

require('./lib/passport');
app.use(passport.initialize());
app.use(passport.session());


app.use(router);



export default app;
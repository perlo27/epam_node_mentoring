import Router from 'koa-router';
import passport from 'koa-passport';

import jwtClient from '../helpers/jwt';

const router = new Router();

router.post('/auth', async (ctx, next) => {
  await passport.authenticate('local', async (err, user, info, status) => {
    if (user === false) {
      return ctx.throw(401);
    }

    const token = jwtClient.sign(user);
    const { username, email } = user;
    const data = {
      user: { username, email },
    };

    await ctx.login(user);
    ctx.body = {
      code: 200,
      message: 'OK',
      data,
      token,
    };
    ctx.status = 200;
  })(ctx, next);
});

router.get('/logout', async ctx => {
  ctx.logout(ctx.state.user);
  ctx.body = {
    code: 200,
    message: 'OK',
  };
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', async ctx => {
  console.log(ctx);
  ctx.redirect('/');
});

export default router.routes();

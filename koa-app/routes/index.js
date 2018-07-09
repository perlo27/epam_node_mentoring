import Router from 'koa-router';
import mock from '../db/models/mock';
import passport from 'koa-passport';

import jwtClient from '../helpers/jwt';

let products = [...mock.products];
let reviews = [...mock.reviews];
let users = [...mock.users];

const router = new Router({
  prefix: '/api',
});

router.get('/products', async (ctx, next) => {
  await passport.authenticate('jwt',  { session: false }, async (err, user) => {
    if(!user) {
      ctx.throw(401);
    }
    ctx.body = products;
  })(ctx, next);

});

router.post('/products', async ctx => {
  products.push(ctx.request.body);
  ctx.body = ctx.request.body;
});

router.get('/products/:id', async ctx => {
  if (!ctx.params.id) {
    ctx.throw(400, 'need some id');
  }
  const requestedProduct = products.find(p => p.id === +ctx.params.id);
  if (!requestedProduct) {
    ctx.throw(404, 'product not found');
  }
  ctx.body = requestedProduct;
});

router.get('/products/:id/reviews', async ctx => {
  if (!ctx.params.id) {
    ctx.throw(400, 'need some id');
  }
  if (!products.find(p => p.id === +ctx.params.id)) {
    ctx.throw(404, 'product not found');
  }
  ctx.body = reviews.filter(r => r.productId === +ctx.params.id);
});

router.get('/users', async ctx => {
  console.log('user---', ctx.state.user);
  console.log('user', ctx.isAuthenticated());
  if (!ctx.isAuthenticated()) {
    ctx.throw(401);
  }
  ctx.body = users;
});

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
      token
    };
    ctx.status = 200;
  })(ctx, next);
});

router.get('/logout', async ctx => {
  ctx.logout(ctx.state.user);
  ctx.body = {
    code: 200,
    message: 'OK'
  }
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', async ctx => {
  console.log(ctx);
  ctx.redirect('/');
});

export default router.routes();

import Router from 'koa-router';
import mock from '../models/mock';
import passport from 'koa-passport';
import jwtClient from '../helpers/jwt';

let products = [...mock.products];
let reviews = [...mock.reviews];
let users = [...mock.users];

const router = new Router({
  prefix: '/api',
});

router.get('/products', async ctx => {
  ctx.body = products;
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
  ctx.body = users;
});

router.post('/auth', async (ctx, next) => {
  passport.authenticate('local', (err, user, info, status) => {
    if (user === false) {
      return ctx.throw(401);
    }

    const token = jwtClient.sign(user);
    const { username, email } = user;
    const data = {
      user: { username, email },
    };

    ctx.body = {
      code: 200,
      message: 'OK',
      data,
      token,
    };
    ctx.status = 200;
  })(ctx, next);
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', async ctx => {
  console.log(ctx);
  ctx.redirect('/');
});

export default router.routes();

import Router from 'koa-router';
import mock from '../db/models/mock';
import passport from 'koa-passport';

import { db } from '../db';

let products = [...mock.products];
let reviews = [...mock.reviews];

const router = new Router({
  prefix: '/api',
});

router.use(async (ctx, next) => {
  // checking auth status
  await passport.authenticate('jwt', { session: false }, async (err, user) => {
    if (!user && !ctx.isAuthenticated()) {
      ctx.throw(401);
    }
    await next();
  })(ctx, next);
});

router.get('/products', async ctx => {
  ctx.body = await db.Product.findAll({
    attributes: ['id', 'name', 'brand', 'price'],
  });
});

router.post('/products', async ctx => {
  const { product, created } = await db.Product.findOrCreate({
    where: { ...ctx.request.body },
  }).spread((product, created) => ({ product, created }));

  if (!created) {
    ctx.throw(422, 'product already exists');
  }
  ctx.body = product.get({ plain: true });
});

router.get('/products/:id', async ctx => {
  if (!ctx.params.id) {
    ctx.throw(400, 'need some id');
  }
  const requestedProduct = await db.Product.findById(ctx.params.id);
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
  ctx.body = await db.User.findAll({
    attributes: ['username', 'email', 'id'],
  });
});


export default router.routes();

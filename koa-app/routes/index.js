import Router from 'koa-router';
import mock from '../models/mock';

let products = [...mock.products];
let reviews = [...mock.reviews];
let users = [...mock.users];

const router = new Router({
    prefix: '/api'
});

router.get('/products', async ctx => {
    ctx.body = products;
});

router.post('/products', async ctx => {
    products.push(ctx.request.body);
    ctx.body = ctx.request.body;  
});

router.get('/products/:id', async ctx => {
    if(!ctx.params.id) {
        ctx.throw(400, 'need some id');
    } 
    const requestedProduct = products.find(p => p.id === +ctx.params.id);
    if(!requestedProduct) {
        ctx.throw(404, 'product not found');
    }
    ctx.body = requestedProduct;
});

router.get('/products/:id/reviews', async ctx => {
    if(!ctx.params.id) {
        ctx.throw(400, 'need some id');
    } 
    if(!products.find(p => p.id === +ctx.params.id)) {
        ctx.throw(404, 'product not found');
    }
    const requestedReviews = reviews.filter(r => r.productId === +ctx.params.id);
    ctx.body = requestedReviews;
});

router.get('/users', async ctx => {
    ctx.body = users;
});


export default router.routes();
import Koa from 'koa';
import router from './routes'
import bodyparser from './middlewares/bodyparser';
import errors from './middlewares/errors';

const app = new Koa();

app.use(bodyparser);
app.use(errors);
app.use(router);

export default app;
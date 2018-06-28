import jwtClient from '../helpers/jwt';

export default async (ctx, next) => {
  if (ctx.url.includes('/api/auth')) {
    return await next();
  }

  try {
    const token = ctx.get('Authorization');
    const user = jwtClient.verify(token.replace('Bearer ', ''));
    ctx.userId = user.id;
    await next();
  } catch (e) {
    if (e.message === 'invalid token') {
      ctx.body = e.message;
      ctx.status = 401;
    } else {
      ctx.body = 'Error 500';
      ctx.status = 500;
      console.error(e.message, e.stack);
    }
  }
};

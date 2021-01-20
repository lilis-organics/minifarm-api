import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'Welcome to minifarm!';
  // console.log(ctx);
});

export default router;

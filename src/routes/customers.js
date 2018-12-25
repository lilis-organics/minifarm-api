import Router from 'koa-router';
import koaBody from 'koa-body';

const router = new Router({
  prefix: '/customers'
});

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello Customers!';
  // console.log(ctx);
});

router.post('/', koaBody(), async (ctx, next) => {
  ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
  ctx.status = 201;
  console.log(ctx.body);
});

router.put('/:id', async (ctx, next) => {
  ctx.body = 'Hello Customers!';
  // console.log(ctx);
});

router.get('/:id', async (ctx, next) => {
  ctx.body = 'Hello Customers!';
  // console.log(ctx);
});

module.exports = router;

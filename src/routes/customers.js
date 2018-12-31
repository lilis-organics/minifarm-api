import Router from 'koa-router';
import koaBody from 'koa-body';
import CustomerService from '../services/customer-service';

const router = new Router({
  prefix: '/customers'
});

router.get('/', async (ctx, next) => {
  ctx.body = await new CustomerService(ctx.db).find(ctx.query);
});

router.get('/:id', async (ctx, next) => {
  let id = ctx.params.id;
  ctx.body = await new CustomerService(ctx.db).get(id);
});

router.post('/', koaBody(), async (ctx, next) => {
  let data = ctx.request.body;
  ctx.body = await new CustomerService(ctx.db).create(data);
});

router.put('/:id', koaBody(), async (ctx, next) => {
  let customerService = new CustomerService(ctx.db);
  let id = ctx.params.id;
  let data = ctx.request.body;

  let doc = await customerService.get(id);

  if (doc) {
    Object.assign(doc, data);
    ctx.body = await new CustomerService(ctx.db).change(doc);
  }
});

module.exports = router;

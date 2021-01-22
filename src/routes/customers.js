import Router from 'koa-router';
import koaBody from 'koa-body';
import { getCustomerSchema } from '../schemas/customer-schema.js';

const router = new Router({
  prefix: '/customers',
});

router.get('/', async (ctx, next) => {
  ctx.body = await ctx.db.customers.findDoc(ctx.query);
});

router.get('/:id', async (ctx, next) => {
  const id = ctx.params.id;
  ctx.body = await ctx.db.customers.findDoc(id);
});

router.post('/', koaBody(), async (ctx, next) => {
  const data = ctx.request.body;
  const customerSchema = getCustomerSchema();
  const valid = customerSchema(data);
  if (!valid) {
    ctx.throw(400, JSON.stringify(customerSchema.errors));
  }

  ctx.body = await ctx.db.saveDoc('customers', data);
});

router.put('/:id', koaBody(), async (ctx, next) => {
  const id = ctx.params.id;
  const data = ctx.request.body;
  const customerSchema = getCustomerSchema();

  const valid = customerSchema(data);
  if (!valid) {
    ctx.throw(400, JSON.stringify(customerSchema.errors));
  }

  ctx.body = await ctx.db.customers.updateDoc(id, data);
});

export default router;

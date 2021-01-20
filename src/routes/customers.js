import Router from 'koa-router';
import koaBody from 'koa-body';
import CustomerService from '../services/customer-service.js';
import { getCustomerSchema } from '../schemas/customer-schema.js';

const router = new Router({
  prefix: '/customers',
});

router.get('/', async (ctx, next) => {
  ctx.body = await new CustomerService(ctx.db).find(ctx.query);
});

router.get('/:id', async (ctx, next) => {
  const id = ctx.params.id;
  ctx.body = await new CustomerService(ctx.db).get(id);
});

router.post('/', koaBody(), async (ctx, next) => {
  const data = ctx.request.body;
  const customerSchema = getCustomerSchema();
  const valid = customerSchema(data);
  if (!valid) {
    ctx.throw(400, JSON.stringify(customerSchema.errors));
  }

  ctx.body = await new CustomerService(ctx.db).create(data);
});

router.put('/:id', koaBody(), async (ctx, next) => {
  const id = ctx.params.id;
  const data = ctx.request.body;
  const customerSchema = getCustomerSchema();

  const valid = customerSchema(data);
  if (!valid) {
    ctx.throw(400, JSON.stringify(customerSchema.errors));
  }

  ctx.body = await new CustomerService(ctx.db).change(id, data);
});

export default router;

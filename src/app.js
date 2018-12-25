import serverless from 'serverless-http';
import Koa from 'koa';
import logger from 'koa-logger';

import rootRouter from './routes/roots';
import dogRouter from './routes/dogs';
import customerRouter from './routes/customers';

const app = new Koa();

app.use(logger());

// error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (err, ctx) => {
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
   */
  console.log('Handle error: ' + err.message);
});

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

app.use(dogRouter.routes());
app.use(dogRouter.allowedMethods());

app.use(customerRouter.routes());
app.use(customerRouter.allowedMethods());

const server = app.listen(3000, () =>
  console.log('server listening on port: 30000')
);
module.exports = server;

// this is it!
// module.exports.handler = serverless(app);

// or as a promise
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  return handler(event, context);
};

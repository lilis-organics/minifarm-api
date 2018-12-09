const serverless = require('serverless-http');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
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

const router = new Router();
router.get('/', (ctx, next) => {
  // throw ctx.throw(400, 'bad request');
  ctx.body = 'Hello World!';
});

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(3000);
module.exports.app = server;

// this is it!
//module.exports.handler = serverless(app);

// or as a promise
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  return await handler(event, context);
};
import serverless from 'serverless-http';
import Koa from 'koa';
import logger from 'koa-logger';
import router from './routes/all-routes';
import Database from './db';

const app = new Koa();

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

app.use(logger());

// prepare database and initialize in koa middleware
const instance = new Database();
app.context.instance = instance;

app.use(async (ctx, next) => {
  ctx.db = await ctx.instance.getDb();
  await next();
});

// add all the routes with allowed methods
app.use(router());

// this is only for running local koa erver
if (process.env.stage === 'local') {
  const server = app.listen(3000, () =>
    console.log('server listening on port: 30000')
  );
  module.exports = server;
}

// this is it!
// module.exports.handler = serverless(app);

// or as a promise
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  return handler(event, context);
};

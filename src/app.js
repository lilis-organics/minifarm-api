import serverless from 'serverless-http';
import Koa from 'koa';
import logger from 'koa-logger';
import router from './routes/all-routes.js';
import Database from './db.js';

console.log('application starting...');

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
const database = new Database().init();
app.context.instance = database;
app.use(async (ctx, next) => {
  ctx.db = await ctx.instance.getDb();
  await next();
});

// add all the routes with allowed methods
app.use(router());

// this is only for running local koa erver -- for running unit test
// if (process.env.stage === 'local') {
//   const server = app.listen(3000, () =>
//     console.log('server listening on port: 30000')
//   );
//   module.exports = server;
// }

// serverless koa handler
export const handler = async (event, context) =>
  serverless(app)(event, context);

// for running unit tests purpose
// module.exports.handler = async (event, context) => serverless(app)(event, context);

console.log('application started');

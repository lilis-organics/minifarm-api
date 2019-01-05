import serverless from 'serverless-http';
import Koa from 'koa';
import logger from 'koa-logger';
import router from './routes/all-routes';
import getDb from './db';

const app = new Koa();

getDb().then(db => {
  app.context.db = db;
});

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

// add all the routes with allowed methods
app.use(router());

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

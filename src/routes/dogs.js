// this is just an example
import request from 'superagent';
import Router from 'koa-router';

const router = new Router({
  prefix: '/dogs',
});

router.get('/', async (ctx, next) => {
  await request
    .get('https://dog.ceo/api/breeds/list/all')
    .then((res) => {
      ctx.body = res.body;
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;

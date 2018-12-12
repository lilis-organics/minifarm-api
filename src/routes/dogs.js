// this is just an example
const request = require('superagent');
const Router = require('koa-router');
const router = new Router({
  prefix: '/dogs'
});

router.get('/', async (ctx, next) => {
  await request
    .get('https://dog.ceo/api/breeds/list/all')
    .then(res => {
      ctx.body = res.body;
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;

// this is just an example
const request = require('superagent');

module.exports = ({ dogRouter }) => {
    dogRouter.get('/', async (ctx, next) => {
        await request
            .get('https://dog.ceo/api/breeds/list/all')
            .then(res => {
                ctx.body = res.body;
            })
            .catch(err => {
                console.log(err);
            });
    });
};
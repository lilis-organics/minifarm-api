module.exports = ({ customerRouter }) => {
    customerRouter.get('/', (ctx, next) => {
        ctx.body = 'Hello Customers!';
        // console.log(ctx);
    });
};
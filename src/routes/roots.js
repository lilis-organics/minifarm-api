module.exports = ({ router }) => {
    router.get('/', (ctx, next) => {
        ctx.body = 'Welcome to minifarm!';
        // console.log(ctx);
    });
};
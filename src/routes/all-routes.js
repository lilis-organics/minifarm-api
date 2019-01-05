import combineRouters from 'koa-combine-routers';

import rootRouter from './roots';
import dogRouter from './dogs';
import customerRouter from './customers';

const router = combineRouters(rootRouter, dogRouter, customerRouter);

export default router;

import combineRouters from 'koa-combine-routers';

import rootRouter from './roots.js';
import dogRouter from './dogs.js';
import customerRouter from './customers.js';

const router = combineRouters(rootRouter, dogRouter, customerRouter);

export default router;

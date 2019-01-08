# minifarm-api
APIs for minifarm

* serverless framework + aws
* koa for rest api (router, logger, error handling)
* jest for unit testing
* superagent as HTTP client (axios )
* introduce multiple routers for modularity
* run on debug mode
* use koa-body to support multipart, urlencoded and json request bodies
* use boom for HTTP-friendly error objects
* eslint with standard for code qualities ([![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com))
* prettier for code formatter 
* [serverless-webpack](https://github.com/serverless-heaven/serverless-webpack) to bundle lambda with webpack
  * build to dist foler: sls webpack
  * package to .serverless folder (zip): ```sls package```
  * run offline: ```sls offline```(the default "Watching for changes" doesn't work well)
  * deploy to aws: ```sls deploy```
* use babel to add support to ES6/ES7 javascript
* introduce massivejs for postgres database access (may try Objection + Knex in the future)
* introduce ajv for json schema validation (joi is a good choice as well but it's not serializable; schm is another good choice, but it's not follow a spec, has limitted features, and not that popular)
* use koa-combine-routers to combine routes so the kao app simply adds the combined routes
* make massive-js work with aws lambda (NOTE: postgres on aws should allow lambda access by using VPC/database security group)
* TODO: environmet variables
* TODO: coputed columns (e.g. full name), full text search, data schema and validation
* TODO: fix unit tests, complete postman test scripts







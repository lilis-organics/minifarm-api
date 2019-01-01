# minifarm-api
APIs for minifarm

* serverless framework + aws
* koa for rest api (router, logger, error handling)
* jest for unit testing
* superagent as HTTP client (axios )
* introduced multiple routers for modularity
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
* TODO: coputed columns (e.g. full name), full text search, data schema and validation, environmet variables
* TODO: fix unit tests, complete postman test scripts







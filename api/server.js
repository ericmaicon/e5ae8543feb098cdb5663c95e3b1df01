require('dotenv').config({
  silent: false,
  path: `${__dirname}/.env`
});

const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaCors = require('koa2-cors');
const KoaBody = require('koa-body');

const app = new Koa();
const port = parseInt(process.env.PORT, 10) || 8081;

//routes
const router = KoaRouter();
require('./routes/index.js')(app, router);

//server
const server = app
  .use(KoaCors())
  .use(KoaBody({
      jsonLimit: '100kb'
    }))
  .use(router.routes())
  .use(async function (context) {
    context.body = 'API';
  })
  .listen(port, () => {
    console.log('Server started on http://0.0.0.0:%s', port);
  });

module.exports = server;

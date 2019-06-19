const koa = require('koa');
const app = new koa();
const convert = require('koa-convert');
const Router = require('koa-router');
const router = new Router();
const logger = require('koa-logger');
const json = require('koa-json');
const views = require('koa-views');
const onerror = require('koa-onerror');
const path = require('path');
const access = require('./middlewares/access');
const file = require('./libs/file');
const mongoose = require('mongoose');
const access_token_file = path.join(__dirname,'./access_token/access_token');

mongoose.connect('mongodb://localhost/actress', {useNewUrlParser: true});
mongoose.connection.on('open',function(){
  console.log('mongodb is open');
});

var wechat_config = {
  wechat:{
    AppID:'wx9fd2965df64ac9f6',
    AppSecret:'9570bdd07e4206010e118ab938bb9335',
    Token:'fanhao',
    getAccessToken() {
      return file.readFileSync(access_token_file);
    },
    saveAccessToken(data) {
      data = JSON.stringify(data);
      return file.writeFileSync(access_token_file,data);
    }
  }
}

//var index = require('./routes/index');
//var users = require('./routes/users');
//var search  = require('./routes/search');

// global middlewares
app.use(convert(views('views', {
  root: __dirname + '/views',
  default: 'ejs'
})));
app.use(convert(require('koa-bodyparser')()));
app.use(convert(json()));
app.use(convert(logger()));

app.use(convert(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
}));

app.use(convert(require('koa-static')(__dirname + '/public')));

// routes definition
//router.use('/', index.routes(), index.allowedMethods());
//router.use('/users', users.routes(), users.allowedMethods());
//router.use('/search', search.routes(), search.allowedMethods());

// mount root routes  
//app.use(convert(router.routes()));
require('./routes/routes')(router);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(convert(access(wechat_config.wechat))); //接入微信中间件


app.on('error', function(err, ctx){
  logger.error('server error', err, ctx);
});

module.exports = app;

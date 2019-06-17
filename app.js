const app = require('koa')()
  , koa = require('koa-router')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');
const path = require('path');
const access = require('./middlewares/access');
const file = require('./libs/file');
const mongoose = require('mongoose');
const access_token_file = path.join(__dirname,'./access_token/access_token');

mongoose.connect('mongodb://localhost/actress');
mongoose.connection.on('open',function(){
  console.log('mongodb is open');
});

var wechat_config = {
  wechat:{
    AppID:'wx9fd2965df64ac9f6',
    AppSecret:'455f5281d328137018622de0a62d840d',
    Token:'johnli',
    getAccessToken() {
      return file.readFileSync(access_token_file);
    },
    saveAccessToken(data) {
      data = JSON.stringify(data);
      return file.writeFileSync(access_token_file,data);
    }
  }
}

var index = require('./routes/index');
var users = require('./routes/users');
var search  = require('./routes/search')

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'ejs'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

app.use(access(wechat_config.wechat)); //接入微信中间件
// routes definition
koa.use('/', index.routes(), index.allowedMethods());
koa.use('/users', users.routes(), users.allowedMethods());
koa.use('/search', search.routes(), search.allowedMethods());

// mount root routes  
app.use(koa.routes());

app.on('error', function(err, ctx){
  logger.error('server error', err, ctx);
});

module.exports = app;

const Router = require('koa-router');
const router = new Router();
const actress = require('../controllers/actress');
const search = require('../controllers/search')

module.exports = router => {
    // Index
    router.get('/', function *(next) {
      yield this.render('index', {
        title: 'Hello World Koa!'
      });
    });
    
    // User
    router.get('/actress/add', actress.addActress);
    router.get('/actress/:name', actress.getActress);
  
  }

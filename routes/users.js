const Router = require('koa-router');
const router = new Router();
const actress = require('../controllers/actress');
const search = require('../controllers/search')


// router.get('/add', actress.addActress);
// router.get('/name',actress.getActress)

// module.exports = router;

module.exports = router => {
    // Index
  
    // User
    router.get('/add', actress.addActress);
    router.get('/name',actress.getActress);
  
  }

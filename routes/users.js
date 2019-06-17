const router = require('koa-router')();
const actress = require('../controllers/actress');

router.get('/', actress.addActress);
router.get('/name',actress.getActress)

module.exports = router;


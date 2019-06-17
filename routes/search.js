const router = require('koa-router')();
const search = require('../controllers/search')

router.get('/', function *(next) {
	yield this.render('search', {});
});
router.get('/:fanhao', search.getResult);
module.exports = router;


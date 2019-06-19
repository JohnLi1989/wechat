const Router = require('koa-router');
const router = new Router();
const search = require('../controllers/search')

router.get('/', function *(next) {
	yield this.render('search', {});
});
router.get('/:fanhao', search.getResult);
module.exports = router;


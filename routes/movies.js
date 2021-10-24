const Router = require('koa-router');

const { movies } = require('../constants/routes');
const MoviesController = require('../controllers/movies-controller');

const router = new Router();

router.prefix(movies);
router.get('/find/:title', MoviesController.find);
router.get('/find-all', MoviesController.findAll);
router.post('/replace', MoviesController.replace);

module.exports = router;
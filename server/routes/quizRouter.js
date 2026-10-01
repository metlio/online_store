const Router = require('express');
const router = new Router();
const quizController = require('../controllers/quizController');

router.post('/result', quizController.createResult);
router.get('/results', quizController.getResults);

module.exports = router;

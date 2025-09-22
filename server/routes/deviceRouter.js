const Router = require('express')
const deviceController = require('../controllers/deviceController')
const ratingController = require('../controllers/ratingController')
const router = new Router()

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id',deviceController.getOne)
router.put('/',ratingController.create)
module.exports = router
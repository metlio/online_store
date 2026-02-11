const Router = require('express')
const deviceController = require('../controllers/deviceController')
const ratingController = require('../controllers/ratingController')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id',deviceController.getOne)
router.put('/',ratingController.create)
router.delete('/:id', deviceController.delete);
module.exports = router
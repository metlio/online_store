const Router = require('express')
const router = new Router()
const ShapochkaController = require('../controllers/ShapochkaController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), ShapochkaController.create)
router.get('/', ShapochkaController.getAll)
router.get('/:id', ShapochkaController.getOne)

module.exports = router
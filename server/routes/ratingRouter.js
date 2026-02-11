const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')

router.get('/', ratingController.getAll)
router.post('/', ratingController.create)

module.exports = router

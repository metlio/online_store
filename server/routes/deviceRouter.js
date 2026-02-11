const express = require('express')
const router = express.Router()
const deviceController = require('../controllers/deviceController')
const ratingController = require('../controllers/ratingController')

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id',deviceController.getOne)
router.put('/',ratingController.create)
router.delete('/:id', deviceController.delete);
module.exports = router
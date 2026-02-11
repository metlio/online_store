const express = require('express')
const router = express.Router()
const ShapochkaController = require('../controllers/ShapochkaController')

router.post('/', ShapochkaController.create)
router.get('/', ShapochkaController.getAll)
router.get('/:id', ShapochkaController.getOne)

module.exports = router
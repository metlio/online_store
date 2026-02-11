const express = require('express')
const router = express.Router()
const brandController = require('../controllers/brandController')

router.post('/', brandController.create)
router.get('/', brandController.getAll)
router.delete('/:id', brandController.delete)

module.exports = router
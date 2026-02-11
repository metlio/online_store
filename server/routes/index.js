const express = require('express')
const router = express.Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const shapochkaRouter = require('./shapochkaRouter')
const ratingRouter = require('./ratingRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/shapochka', shapochkaRouter)
router.use('/rating', ratingRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)

module.exports = router
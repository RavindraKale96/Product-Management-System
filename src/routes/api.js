const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const productRoute = require('./product')

router.use('/user',userRoute)
router.use('/product', productRoute)

module.exports = router

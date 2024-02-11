const express = require('express')
const router = express.Router()
const controller = require('../controller/userController')
const { auth, allowAdminOnly } = require('../middlewares/auth')

router.post('/signup', controller.userSignUp)
router.put('/updateUserRole', auth, allowAdminOnly, controller.updateUserRole)
router.delete('/deleteUser/:id', auth, allowAdminOnly, controller.deleteUser)
router.get('/getAllUser', auth, allowAdminOnly, controller.getAllUsers)
router.post('/login', controller.userLogIn)

module.exports = router
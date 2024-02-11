const express = require('express')
const router = express.Router()
const controller = require('../controller/productController')

const upload = require('../middlewares/upload')
const { auth, allowAdminOnly } = require("../middlewares/auth")

router.get('/getAllProduct', auth, controller.getAllProducts)
router.get('/:id', auth, controller.getProductById)
router.post('/addProduct', auth, allowAdminOnly, upload.array("product-images", 10), controller.addNewProduct)
router.delete('/:id', auth, allowAdminOnly, controller.deleteProduct)
router.put('/updateProduct/:id', auth, allowAdminOnly, upload.array("product-images", 10), controller.updateProductById)

module.exports = router
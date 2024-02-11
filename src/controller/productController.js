const productService = require('../services/product/index')
const { createProductSchema, deleteProductSchema, productByIdSchema, updateProductSchema } = require("../helper/validator_schema")

module.exports = {
    async getAllProducts(req, res) {
        try {
            const { page = 1, limit = 10, title, minPrice, maxPrice, manufacturer } = req.query;
            const product = await productService.getAllProducts({ page, limit, minPrice, maxPrice, manufacturer, title })
            res.send(product)
        } catch (error) {
            res.status(400).send(error.toString())
        }
    },

    async addNewProduct(req, res) {
        try {
            const { name, description, quantity, manufacturer, price } = await createProductSchema.validateAsync(req.body)
            const images = await req.files.reduce((acc, el) => {
                return [...acc, el.filename]
            }, [])
            const newProduct = {
                name,
                description,
                quantity,
                manufacturer,
                price,
                images
            }
            const addedProduct = await productService.addNewPrduct(newProduct)
            res.status(201).send(addedProduct)
        } catch (error) {
            res.status(500).send(error.toString())
        }
    },

    async deleteProduct(req, res) {
        try {
            const productId = await deleteProductSchema.validateAsync(req.params.id)
            const deletedProd = await productService.deleteProduct(productId)
            if (deletedProd) res.status(200).send({ message: 'Product deleted successfully' })
        } catch (error) {
            res.status(400).send(error.toString())
        }
    },
    async getProductById(req, res) {
        try {
            const productId = await productByIdSchema.validateAsync(req.params.id)
            const product = await productService.getProductById(productId)
            if (product) res.status(200).send(product)
        } catch (error) {
            res.status(400).send(error.toString())
        }
    },
    async updateProductById(req, res) {
        try {
            const productId = await productByIdSchema.validateAsync(req.params.id)
            const productData = await updateProductSchema.validateAsync(req.body);
            let productImages = []
            if (req.files) {
                productImages = await req.files.reduce((acc, el) => {
                    return [...acc, el.filename]
                }, [])
            }
            const updatedProduct = await productService.updateProductById(productId, productData, productImages)
            if (updatedProduct) res.status(200).send({ message: "Product details updated" })
        } catch (error) {
            res.status(400).send(error.toString())
        }
    }
}
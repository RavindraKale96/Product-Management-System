const path = require('path')
const models = require('../../../models/index')
const fs = require('fs/promises')
const { Op } = require('sequelize');

/*
We need to store product images on cloud s3 and use the signed url of it, 
I have created the local folder and stored it for now but it is heavy operation for server to send buffer in response also it consuming more time for response.
*/

module.exports = {
  async getAllProducts(paginationAndfilterOption) {
    const { page, limit, minPrice, maxPrice, manufacturer, title } = paginationAndfilterOption
    const where = {};
    if (title) where.name = { [Op.iLike]: `%${title}%` };
    if (minPrice && maxPrice) where.price = { [Op.between]: [minPrice, maxPrice] };
    if (manufacturer) where.manufacturer = manufacturer;

    try {
      const products = await models.Product.findAndCountAll({
        where,
        limit: parseInt(page),
        offset: (parseInt(page) - 1) * parseInt(limit)
      })
      for (let product of products.rows) {
        let filePath = path.join(global.$rootDir, '..', 'uploads')
        let images = []
        for (let image of product.images) {
          let file = await fs.readFile(path.join(filePath, image))
          images.push(file)
        }
        product.images = images
      }
      return products
    } catch (error) {
      throw error
    }
  },

  async addNewPrduct(product) {
    try {
      const newProduct = await models.Product.create(product)
      const product_images = []

      for (let image of newProduct.images) {
        let fileUploadPath = path.join(global.$rootDir, '..', 'uploads')
        let imagefile = await fs.readFile(path.join(fileUploadPath, image))
        product_images.push(imagefile)
      }
      
      newProduct.images = product_images
      return newProduct
    } catch (error) {
      throw error
    }
  },

  async deleteProduct(productId) {
    try {
      const productImagesPath = path.join(global.$rootDir, '..', 'uploads')
      const product = await models.Product.findOne({
        where: {
          id: productId
        }
      })
      if (!product) throw new Error(" Product not found")
      const deletedProduct = await models.Product.destroy({
        where: {
          id: productId
        }
      })
      if (deletedProduct > 0) {
        for (let image of product.images) {
          await fs.unlink(path.join(productImagesPath, image))
        }
        return true
      }
      return false
    } catch (error) {
      throw error
    }
  },

  async getProductById(productId) {
    try {
      const productImagesPath = path.join(global.$rootDir, '..', 'uploads')
      const product = await models.Product.findOne({
        where: {
          id: productId
        }
      })
      if (!product) throw new Error(" Product not found")
      let images = []
      for (let image of product.images) {
        let file = await fs.readFile(path.join(productImagesPath, image))
        images.push(file)
      }
      product.images = images
      return product
    } catch (error) {
      throw error
    }
  },

  async updateProductById(productId, productData, images) {
    try {
      const product = await models.Product.findOne({
        where: {
          id: productId
        }
      })
      if (!product) throw new Error(" Product not found")
      if (images.length) {
        productData.images = [...images, ...product.images]
      }
      const updatedProduct = await models.Product.update(productData, {
        where: {
          id: productId
        }
      })
      if (updatedProduct > 0) return true
      return false
    } catch (error) {
      throw error
    }
  }
}
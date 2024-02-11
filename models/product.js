'use strict';
const {
  Model
} = require('sequelize');
const {v4:uuidv4} = require("uuid")
const fs = require('fs/promises')
const path = require('path')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
    
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    images: DataTypes.ARRAY(DataTypes.JSON),
    manufacturer: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });

  Product.beforeCreate((product, _) => {
    return product.id = uuidv4()
  })
  return Product;
};
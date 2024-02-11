const Joi = require('joi')

const userSignUpSchema = Joi.object({
    firstName: Joi.string().alphanum().min(1).max(50).required(),
    lastName: Joi.string().alphanum().min(1).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

const userRoleUpdateSchema = Joi.object({
    userId : Joi.string().guid({ version: 'uuidv4' }).required(),
    role:Joi.string().required()
})

const deleteUserSchema =  Joi.string().guid({ version: 'uuidv4' }).required()

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number().required(),
    manufacturer: Joi.string().required(),
    price: Joi.number().required()
})

const updateProductSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    quantity: Joi.number().optional(),
    manufacturer: Joi.string().optional(),
    price: Joi.number().optional()
})

const deleteProductSchema = Joi.string().guid({ version: 'uuidv4' }).required()
const productByIdSchema = Joi.string().guid({ version: 'uuidv4' }).required()

module.exports ={
    userSignUpSchema,
    userLoginSchema,
    userRoleUpdateSchema,
    deleteUserSchema,
    createProductSchema,
    deleteProductSchema,
    productByIdSchema,
    updateProductSchema
}
const userService = require('../services/user/index')
const { userSignUpSchema, userLoginSchema, userRoleUpdateSchema, deleteUserSchema } = require('../helper/validator_schema')

const { userRoles } = require('../common/index')



module.exports = {
    async userSignUp(req, res) {
        try {
            const userData = await userSignUpSchema.validateAsync(req.body)
            userData.role = userRoles.USER
            const user = await userService.createUser(userData)
            if (user) res.status(201).send({ message: "user created sucessfully" })
        } catch (error) {
            res.status(400).send({ message: error.toString() })
        }
    },

    async updateUserRole(req, res) {
        try {
            const userData = await userRoleUpdateSchema.validateAsync(req.body)
            const updatedUser = await userService.updateUserRole(userData)
            if (updatedUser) {
                res.status(200).send({ message: "user role is updated" })
            }
        } catch (error) {
            res.status(400).send({ message: error.toString() })
        }
    },

    async deleteUser(req, res) {
        try {
            const userId = await deleteUserSchema.validateAsync(req.params.id)
            const deletedUser = await userService.deleteUser(userId)
            if (deletedUser) {
                res.status(200).send({ message: "user deleted successfully" })
            }
        } catch (error) {
            res.status(400).send({ message: error.toString() })
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers()
            res.status(200).send(users)
        } catch (error) {
            res.status(400).send({ message: error.toString() })
        }
    },

    async userLogIn(req, res) {
        try {
            const userdata = await userLoginSchema.validateAsync(req.body)
            const token = await userService.userLogIn(userdata)
            if (token) {
                res.status(200).send({ accessToken: token })
            }
        } catch (error) {
            res.status(400).send({ message: error.toString() })
        }
    }
}
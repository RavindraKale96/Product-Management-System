
const models = require('../../../models/index')
const Bcrypt = require("bcrypt")
const { generateUserToken } = require('../jwt/index')
module.exports = {
    async createUser(userData) {
        try {
            const user = await models.User.findOne({
                where: {
                    email: userData.email
                }
            })
            if (user) throw new Error("already user exist for this mailid please use another one")
            userData.password = Bcrypt.hashSync(userData.password, 10)
            const newuser = await models.User.create(userData)
            if (newuser) return true
            return false
        } catch (error) {
            throw error
        }
    },

    async userLogIn(userData) {
        try {
            const { email, password } = userData
            const user = await models.User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) throw new Error("User not available for this mail id please signup")
            const verifyPassword = await Bcrypt.compare(password, user.password)
            if (!verifyPassword) throw new Error("Password is incorrect")
            if (user && verifyPassword) {
                return generateUserToken({ userId: user.id, userRole: user.role })
            }
        } catch (error) {
            throw error
        }
    },

    async updateUserRole(userData) {
        try {
            const { userId, role } = userData
            const updatedUser = await models.User.update({ role }, {
                where: {
                    id: userId
                }
            })
            if (updatedUser > 0) return true
            return false
        } catch (error) {
            throw error
        }
    },

    async deleteUser(userId) {
        try {
            const user = await models.User.findOne({
                where: {
                    id: userId
                }
            })
            if (!user) throw Error("user not found")
            const deletedUser = await models.User.destroy({
                where: {
                    id: userId
                }
            })
            if (deletedUser > 0) return true
            return false
        } catch (error) {
            throw error
        }
    },

    async getAllUsers() {
        try {
            return await models.User.findAll()
        } catch (error) {
            throw error
        }
    }
}
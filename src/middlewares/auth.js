const models = require('../../models/index')
const { verifyAuthToken } = require('../services/jwt/index')
const { userRoles } = require('../common/index')

module.exports = {
    async auth(req, res, next) {
        try {
            const token = req.headers['authorization']
            const decodedUser = verifyAuthToken(token)
            const user = await models.User.findOne({
                where: {
                    id: decodedUser.userId
                }
            })
            if (!user) res.status(401).send("Invalid Token")
            req.user = user
            next();
        } catch (error) {
            res.status(401).send("Unauthorized")
        }
    },

    async allowAdminOnly(req, res, next) {
        if (req.user.role === userRoles.ADMIN) {
            next()
        } else {
            res.status(401).send({ message: 'you have not authorized to access this endpoints' })
        }
    }
}

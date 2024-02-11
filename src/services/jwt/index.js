const { sign, verify } = require('jsonwebtoken')
const secretKey = process.env.SECRETE_KEY;


module.exports = {
    generateUserToken(userdata) {
        return sign(userdata, secretKey, { expiresIn: '1hr' });
    },

    verifyAuthToken(token) {
        try {
           const decoded = verify(token, secretKey)
           return decoded
        } catch (error) {
            return error
        }
    }
}
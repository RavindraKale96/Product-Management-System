const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(global.$rootDir, '..', 'uploads'))
    },
    filename: (req, file, cb) => {
        let ext = 'jpeg'
        // let ext = file.originalname.ext.slice(1)
        cb(null, `${uuidv4()}.${ext}`)
    }
})

const upload = multer({ storage: storage })

module.exports = upload
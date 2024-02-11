const express = require('express');
require('dotenv').config()
const router = require('./routes/api');
const app = express();
const PORT = process.env.PORT || 8085;

global.$rootDir = __dirname

app.use(express.json())
app.use(router)

app.listen(PORT, () => {
    console.log(" Server is listning on port : ", PORT)
})


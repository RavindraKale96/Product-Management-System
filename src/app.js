const express = require('express');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT;

app.use(express.json())

app.listen(PORT, () => {
    console.log(" Server is listning on port : ", PORT)
})


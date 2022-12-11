require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const password = require("passport")
const passportSetup = require('./passport/passport')
const api = require('./routes/api')
const errorMiddleware = require('./middlewares/errorMiddleware')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(password.initialize())
app.use(password.session())
app.use('/api', api)
app.use(errorMiddleware)


app.listen(PORT, () => {
    console.log(`APP app listening at http://localhost:${PORT}`)
})
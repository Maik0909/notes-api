const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./db.js')
const handleErros = require('./middlewares/handleErrors.js')
const notesRoutes = require('./routes/notes.js')
const usersRoutes = require('./routes/users.js')


dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(usersRoutes)
app.use(notesRoutes)
app.use(handleErros)

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))

module.exports = { app, server }

require('dotenv').config()
const express = require('express')
const app = express()

const boardRouter = require('./routers/boards')
const detailRouter = require('./routers/detail')
const userRouter = require('./routers/users')

app.use('/board', boardRouter)
app.use('/detail', detailRouter)
app.use('/user', userRouter)

const PORT = process.env.PORT || 7000

app.listen(PORT, console.log("connected server..."))
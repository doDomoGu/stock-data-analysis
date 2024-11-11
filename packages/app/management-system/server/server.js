require('module-alias/register')

const express = require('express')

const router = require('./src/router')

const app = express()

app.use('/', router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

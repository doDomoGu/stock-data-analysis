const express = require('express')
const list = require('./list')


const router = express.Router()

router.use('/list', list)

module.exports = router
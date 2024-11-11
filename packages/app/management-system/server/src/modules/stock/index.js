const express = require('express')

const router = express.Router()

router.use('/list', require('./list'))
router.use('/info', require('./info'))
router.use('/data', require('./data'))

module.exports = router
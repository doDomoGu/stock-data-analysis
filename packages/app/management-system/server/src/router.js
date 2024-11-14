const express = require('express')
const stock = require('./modules/stock')

const router = express.Router()

// router.get('/', (req, res) => {
//   res.send('Hello World!')
// })

router.use('/stock', stock)

module.exports = router

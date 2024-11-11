const express = require('express')
const router = express.Router()

app.get('/', async (req, res) => {
  res.send('stock-list')
})

// export default app
module.exports = router

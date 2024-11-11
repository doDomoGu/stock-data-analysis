const express = require('express')

const router = express.Router()

const connection = require('@utils/db')

router.get('/', async (req, res) => {
  const queryStr = 'select * from `stocks`'
  connection.query(queryStr,(err, results) =>{
    res.send(results)
  })
  
})

// export default app
module.exports = router

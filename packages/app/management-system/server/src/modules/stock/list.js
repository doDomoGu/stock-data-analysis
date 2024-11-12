const express = require('express')

const router = express.Router()

const getConnection = require('@utils/db')

router.get('/', async (req, res) => {
  const connection = await getConnection()
  const [results] = await connection.query('select * from `stocks`')

  res.send(results)

})

// export default app
module.exports = router
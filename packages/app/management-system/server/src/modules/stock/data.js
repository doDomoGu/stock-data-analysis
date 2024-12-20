const express = require('express')

const router = express.Router()

const getConnection = require('@utils/db')

router.get('/', async (req, res) => {
  const connection = await getConnection()

  const query = {
    sort_name: 'date',
    sort_type: 'DESC',
    page_num: 1,
    page_size: 20,
    ...req.query
  }

  const [[totalResults], [listResults]] = await Promise.all([
    connection.query(
      `select count(*) as total from \`stocks_data\``
    ),
    connection.query(
      `select * from \`stocks_data\` where \`code\` = '${query.code}' order by \`${query.sort_name}\` ${query.sort_type} limit ?,?`,
      [parseInt((query.page_num - 1) * query.page_size), parseInt(query.page_size)]
    )
  ])

  res.send({
    total: totalResults[0].total,
    list: listResults
  })
})

// export default app
module.exports = router

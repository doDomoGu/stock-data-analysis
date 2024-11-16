const express = require('express')

const router = express.Router()

const getConnection = require('@utils/db')

router.get('/', async (req, res) => {
  const connection = await getConnection()
  const query = {
    sort_name: 'percentage_change',
    sort_type: 'DESC',
    page_num: 1,
    page_size: 20,
    filter_abnormal: 'true',
    ...req.query
  }

  // 数字/布尔值 类型修正
  query.page_num = parseInt(query.page_num)
  query.page_size = parseInt(query.page_size)
  query.filter_abnormal = query.filter_abnormal.toLowerCase() === 'true'

  const [[totalResults], [listResults]] = await Promise.all([
    connection.query(
      `select count(*) as total from \`stocks\`` + (query.filter_abnormal ? ` where cur_price is not null` : '')
    ),
    connection.query(
      `select * from \`stocks\`` + (query.filter_abnormal ? ` where cur_price  is not null` : '') + ` order by \`${query.sort_name}\` ${query.sort_type} limit ?,?`,
      [(query.page_num - 1) * query.page_size, query.page_size]
    )
  ])

  res.send({
    total: totalResults[0].total,
    list: listResults
  })

})

module.exports = router

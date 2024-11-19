// 将cache写入数据库

// 2024-11-08  34.00   32.86   34.56   32.80    1304568     4390234168.00     5.36         0.03             0.01          8.42
// date        open    close   highest lowest   volume      amount            volatility   percentage_change   price_change  turnover_rate
// 日期         开盘价   收盘价   最高价   最低价    成交量(VOL)       成交额             振幅          变化幅度          变化价格          换手率(TOR)

import { readFile } from 'fs/promises'
import connection from '../utils/db.js'

const stockList = [
  {
    code: '600895',
    name: '张江高科'
  },
  {
    code: '601988',
    name: '中国银行'
  }
]

const createTable = async (stockCode) => {
  await connection.execute(`DROP TABLE IF EXISTS \`data_${stockCode}\` `)
  await connection.query(
    `CREATE TABLE IF NOT EXISTS \`data_${stockCode}\` (
    \`date\` DATETIME NOT NULL,
    \`open\` FLOAT NULL COMMENT '开盘价',
    \`close\` FLOAT NULL COMMENT '收盘价',
    \`highest\` FLOAT NULL COMMENT '最高价',
    \`lowest\` FLOAT NULL COMMENT '最低价',
    \`volume\` INT NULL COMMENT '成交量(VOL)',
    \`amount\` FLOAT NULL COMMENT '成交额',
    \`volatility\` FLOAT NULL COMMENT '振幅',
    \`percentage_change\` FLOAT NULL COMMENT '变化幅度',
    \`price_change\` FLOAT NULL COMMENT '变化价格',
    \`turnover_rate\` FLOAT NULL COMMENT '换手率',
    PRIMARY KEY (\`date\`)); `
  )
}

const getJson = async (stockCode) => {
  const content = await readFile(
    './cache/stock-data/' + stockCode + '-full.json'
  )
  return JSON.parse(content)
}

const saveData = async (stockCode, data) => {
  const pieceNum = 200
  const len = Math.ceil(data.length / pieceNum)

  const queryData = []
  for (let i = 0; i < len; i++) {
    queryData.push(
      data
        .slice(pieceNum * i, pieceNum * i + pieceNum)
        .map((n) => `('${n.slice(0, 10)}'${n.slice(10)})`)
        .join(',')
    )
  }

  try {
    for (let item of queryData) {
      const queryStr = `insert into \`data_${stockCode}\` values ${item} `

      await connection.query(queryStr)
    }
  } catch (err) {
    console.log(err)
  }
}

for (let item of stockList) {
  console.time(`runtime_${item.code}`)
  console.log(item)
  await createTable(item.code)
  console.log('=== create table success ===')
  const data = await getJson(item.code)
  console.log('=== get json success ===', 'length:', data.length)
  await saveData(item.code, data)
  console.log('=== save data success ===')
  console.timeEnd(`runtime_${item.code}`)
}

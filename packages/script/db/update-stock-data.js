import connection from "../utils/db.js";

const createTable = async () => {
  // await connection.execute(`DROP TABLE IF EXISTS \`stocks_data\` `)
  await connection.query(
    `CREATE TABLE IF NOT EXISTS \`stocks_data\` (
      \`date\` datetime NOT NULL,
      \`code\` char(6) NOT NULL,
      \`open\` float DEFAULT NULL COMMENT '开盘价',
      \`close\` float DEFAULT NULL COMMENT '收盘价',
      \`highest\` float DEFAULT NULL COMMENT '最高价',
      \`lowest\` float DEFAULT NULL COMMENT '最低价',
      \`volume\` int DEFAULT NULL COMMENT '成交量(VOL)',
      \`amount\` float DEFAULT NULL COMMENT '成交额',
      \`volatility\` float DEFAULT NULL COMMENT '振幅',
      \`percentage_change\` float DEFAULT NULL COMMENT '变化幅度',
      \`price_change\` float DEFAULT NULL COMMENT '变化价格',
      \`turnover_rate\` float DEFAULT NULL COMMENT '换手率',
      \`ma_values\` json DEFAULT NULL COMMENT 'MA数据',
      PRIMARY KEY (\`date\`,\`code\`),
      KEY \`idx_code\` (\`code\`),
      KEY \`idx_date\` (\`date\`)
    );`
  )
}

const updateData = async (data) => {
  try {
    const cols = [
      'date',
      'code',
      'open',
      'close',
      'highest',
      'lowest',
      'volume',
      'amount',
      'volatility',
      'percentage_change',
      'price_change',
      'turnover_rate'
    ]
    const colsUpdate = cols.filter(col => !['date', 'code'].includes(col))

    if (data && Array.isArray(data) && data.length > 0) {
      const sql = `INSERT INTO \`stocks_data\`` +
        ` (${cols.map(col => `\`${col}\``).join(', ')})` +
        ` VALUES ${data.join(', ')}` +
        ` ON DUPLICATE KEY UPDATE ${colsUpdate.map(col => `\`${col}\`=VALUES(\`${col}\`)`).join(', ')};`

      // console.log({ sql })
      await connection.execute(sql)
    }
  } catch (err) {
    console.log(err)
  }
}


export default { createTable, updateData }

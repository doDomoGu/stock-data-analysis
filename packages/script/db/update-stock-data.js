import connection from "../utils/db.js";

// const createTable = async (stockCode) => {
//   await connection.execute(`DROP TABLE IF EXISTS \`data_${stockCode}\` `)
//   await connection.query(
//     `CREATE TABLE IF NOT EXISTS \`data_${stockCode}\` (
//     \`date\` DATETIME NOT NULL,
//     \`open\` FLOAT NULL COMMENT '开盘价',
//     \`close\` FLOAT NULL COMMENT '收盘价',
//     \`highest\` FLOAT NULL COMMENT '最高价',
//     \`lowest\` FLOAT NULL COMMENT '最低价',
//     \`volume\` INT NULL COMMENT '成交量(VOL)',
//     \`amount\` FLOAT NULL COMMENT '成交额',
//     \`volatility\` FLOAT NULL COMMENT '振幅',
//     \`percentage_change\` FLOAT NULL COMMENT '变化幅度',
//     \`price_change\` FLOAT NULL COMMENT '变化价格',
//     \`turnover_rate\` FLOAT NULL COMMENT '换手率',
//     PRIMARY KEY (\`date\`)); `
//   )
// }

// const updateData = async (stockCode, data) => {
//   try {
//     await connection.execute(`INSERT INTO \`data_${stockCode}\` VALUES ` + data.join(',')
//     )
//   } catch (err) {
//     console.log(err)
//   }
// }

const createTable = async () => {
  await connection.execute(`DROP TABLE IF EXISTS \`stocks_data\` `)
  await connection.query(
    `CREATE TABLE \`stocks_data\` (
      \`date\` datetime NOT NULL,
      \`code\` varchar(20) NOT NULL,
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
      PRIMARY KEY (\`date\`,\`code\`)
    );`
  )
}

const updateData = async (data) => {
  try {
    if (data && Array.isArray(data) && data.length > 0) {
      await connection.execute(`INSERT INTO \`stocks_data\` VALUES ` + data.join(','))
    }
  } catch (err) {
    console.log(err)
  }
}


export default { createTable, updateData }

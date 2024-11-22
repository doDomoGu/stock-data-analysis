import connection from "../utils/db.js";


export const getCodes = async () => {
  try {
    const [result, fields] = await connection.query("select `code` from `stocks`");
    return result
  } catch (err) {
    console.log(err);
  }
}

export const updateData = async (datas) => {
  // { 
  //   code: '300177', 
  //   name: '中海达', 
  //   open_date: '2011-02-15' 
  // }

  try {
    if (datas && Array.isArray(datas) && datas.length > 0) {
      const cols = [
        'code',
        'name',
        'open_date'
      ]
      const colsUpdate = cols.filter(col => !['code'].includes(col))

      const dataValues = ((datas) => datas.map(n => `('${n.code}', '${n.name}', '${n.open_date}')`).join(', ')
      )(datas)

      const sql = `INSERT INTO \`stocks\`` +
        ` (${cols.map(col => `\`${col}\``).join(', ')})` +
        ` VALUES ${dataValues}` +
        ` ON DUPLICATE KEY UPDATE ${colsUpdate.map(col => `\`${col}\`=VALUES(\`${col}\`)`).join(', ')};`

      // console.log({ sql })
      await connection.execute(sql)
    }
  } catch (err) {
    console.log(err)
  }
}

// const updateOpenDate = async (values) => {
//   try {
//     await connection.execute(`CREATE TABLE IF NOT EXISTS stocks_open_date (
//       \`code\` varchar(20) NOT NULL,
//       \`open_date\` varchar(50) DEFAULT NULL COMMENT '上市日期',`+
//       // `\`is_open\` tinyint(1) DEFAULT NULL COMMENT '0 正常 -1 退市',`+
//       `PRIMARY KEY (\`code\`)
//     );`)

//     await connection.execute(`REPLACE INTO \`stocks_open_date\` (` +
//       `\`code\`` +
//       `,\`open_date\`` +
//       //`,\`is_open\``+
//       `) VALUES ` + values.join(","))

//     // const queryStr =
//     //   "UPDATE `stocks` S " +
//     //   "INNER JOIN `stocks_open_date` O ON S.code = O.code " +
//     //   "SET S.open_date = O.open_date"
//     // // + ", S.is_open = O.is_open"
//     // // console.log("queryStr: ", queryStr);

//     // await connection.execute(queryStr);

//     // await connection.execute(`DROP TABLE \`stocks_open_date\``)

//   } catch (err) {
//     console.log(err);
//   }
// }

// const updateOpenDate2Stocks = async () => {
//   const queryStr =
//     "UPDATE `stocks` S " +
//     "INNER JOIN `stocks_open_date` O ON S.code = O.code " +
//     "SET S.open_date = O.open_date"
//   // +", S.is_open = O.is_open"
//   // console.log("queryStr: ", queryStr);

//   await connection.execute(queryStr);

//   // await connection.execute(`DROP TABLE \`stocks_open_date\``)
// }


// export default { updateOpenDate, updateOpenDate2Stocks }
import connection from "../utils/db.js";

const updateOpenDate = async (values) => {
  try {
    await connection.execute(`CREATE TABLE IF NOT EXISTS stocks_open_date (
      \`code\` varchar(20) NOT NULL,
      \`open_date\` varchar(50) DEFAULT NULL COMMENT '上市日期',`+
      // `\`is_open\` tinyint(1) DEFAULT NULL COMMENT '0 正常 -1 退市',`+
      `PRIMARY KEY (\`code\`)
    );`)

    await connection.execute(`REPLACE INTO \`stocks_open_date\` (` +
      `\`code\`` +
      `,\`open_date\`` +
      //`,\`is_open\``+
      `) VALUES ` + values.join(","))

    // const queryStr =
    //   "UPDATE `stocks` S " +
    //   "INNER JOIN `stocks_open_date` O ON S.code = O.code " +
    //   "SET S.open_date = O.open_date"
    // // + ", S.is_open = O.is_open"
    // // console.log("queryStr: ", queryStr);

    // await connection.execute(queryStr);

    // await connection.execute(`DROP TABLE \`stocks_open_date\``)

  } catch (err) {
    console.log(err);
  }
}

const updateOpenDate2Stocks = async () => {
  const queryStr =
    "UPDATE `stocks` S " +
    "INNER JOIN `stocks_open_date` O ON S.code = O.code " +
    "SET S.open_date = O.open_date"
  // +", S.is_open = O.is_open"
  // console.log("queryStr: ", queryStr);

  await connection.execute(queryStr);

  // await connection.execute(`DROP TABLE \`stocks_open_date\``)
}


export default { updateOpenDate, updateOpenDate2Stocks }
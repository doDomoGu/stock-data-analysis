import dayjs from 'dayjs'
import connection, { getConnection } from "../utils/db.js";
// import getStockCodesFromDb from './get-stock-codes.js';


// export const createTable = async () => {
//   await connection.execute(`DROP TABLE IF EXISTS \`stocks_ma\` `)
//   await connection.query(
//     `CREATE TABLE IF NOT EXISTS \`stocks_ma\` (
//       \`date\` datetime NOT NULL,
//       \`code\` varchar(20) NOT NULL,
//       \`num\` int NOT NULL,
//       \`val\` text DEFAULT NULL,
//       \'real_num\' int NOT NULL
//       PRIMARY KEY (\`date\`,\`code\`,\`num\`)
//     );`
//   )
//   connection.end()
// }

export const getCodes = async (date = dayjs().format('YYYY-MM-DD')) => {
  try {
    const [result, fields] = await connection.query("select `code` from `stocks_data` where `date` = \"" + date + "\"");
    return result
  } catch (err) {
    console.log(err);
  }
}

export const getMA = async (codes, dates = [dayjs().format('YYYY-MM-DD')], nums = [10, 20, 50, 610]) => {
  const conn = await getConnection()
  // const eDate = dayjs(endDate).format('YYYY-MM-DD')

  console.time('db getMA')

  const getOne = async (code, date, num) => {
    const [result] = await conn.execute(`SELECT avg(T.close) as val, count(*) as real_num from ( select close from \`stocks_data\` where \`code\` = '${code}' and \`date\` <= '${date}' order by \`date\` desc limit ${num}) as T;`)
    return { ...result[0], code, date, num }
  }
  const resultList = await Promise.all(((codes, dates, nums) => {
    const asyncFuncs = []
    codes.forEach(code => {
      dates.forEach(date => {
        nums.forEach(num => {
          asyncFuncs.push(getOne(code, date, num))
        })
      })
    })
    return asyncFuncs
  })(codes, dates, nums))
  console.timeEnd('db getMA')
  // console.log(resultList.length)
  // console.log(resultList)
  await conn.end()

  return resultList
}

export const updateData = async (datas) => {
  // {
  //   code: '300643',
  //   date: '2024-11-21',
  //   ma_values: [ [Object], [Object], [Object], [Object] ]
  // },

  try {
    if (datas && Array.isArray(datas) && datas.length > 0) {
      const cols = [
        'date',
        'code',
        'ma_values'
      ]
      const colsUpdate = cols.filter(col => !['date', 'code'].includes(col))

      const dataValues = ((datas) => datas.map(n => `('${n.date}','${n.code}', '${JSON.stringify(n.ma_values)}' )`).join(', ')
      )(datas)

      const sql = `INSERT INTO \`stocks_data\`` +
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


// export const getStartDateByMA = async (code, nums) => {
//   const conn = await getConnection()
//   // const eDate = dayjs(endDate).format('YYYY-MM-DD')
//   console.time('sql')
//   console.time('sql1')
//   await conn.execute(`CREATE TEMPORARY TABLE temp_table (
//     \`date\` datetime NOT NULL,
//     \`close\` float NOT NULL
//   );`)
//   console.timeEnd('sql1')
//   console.time('sql2')
//   await conn.execute(`INSERT INTO temp_table select \`date\`,\`close\` from stocks_data where \`code\` = '${code}';`)
//   console.timeEnd('sql2')
//   // const [result2] = await connection.execute(`SELECT avg(T.close) as val, count(*) as real_num from ( select close from temp_table order by date desc limit 0,10) as T;`)
//   // console.log('result2:', result2)

//   const queryMA = async (num) => {
//     const [result] = await conn.execute(`SELECT avg(T.close) as val, count(*) as real_num from ( select close from temp_table order by date desc limit ${num}) as T;`)
//     return result
//   }
//   console.time('sql3')
//   const resultList = await Promise.all(nums.map(num => queryMA(num)))
//   console.timeEnd('sql3')
//   console.timeEnd('sql')
//   console.log(resultList.length, resultList)
//   await conn.end()
//   return true




//   // console.log('eDate', eDate.format('YYYY-MM-DD'))

//   // const [result] = await connection.execute(`SELECT * FROM \`calendar\` where \`date\` <= '${eDate.format('YYYY-MM-DD')}' and is_open = 1 order by \`date\` DESC limit 0,${num}`)

//   // console.log(result.length, dayjs(result[result.length - 1].date).format('YYYY-MM-DD'))


//   // const [result2] = await connection.execute(`SELECT \`date\`,\`close\` FROM \`stocks_data\` where \`code\` = '601200' order by \`date\` DESC limit 0,${num}`)

//   // console.log(result2.length, dayjs(result2[result2.length - 1].date).format('YYYY-MM-DD'))
//   console.time('sql')

//   const query = async (code, num) => {
//     const [result] = await connection.execute(`SELECT avg(close) as val FROM \`stocks_data\` where \`code\` = '${code}' order by \`date\` DESC `) //limit ${num}`)

//     return [code, result[0].val]
//   }

//   // const [result3] = await connection.execute(`SELECT avg(close) FROM \`stocks_data\` where \`code\` = '601200' order by \`date\` DESC limit ${num}`)
//   const codes = (await getStockCodesFromDb()).map(n => n.code)
//     // .sort(() => 0.5 - Math.random())
//     .slice(0, 10)
//   console.log('\'' + codes.join('\',\'') + '\'')
//   // console.log(codes.length, codes[0])
//   // codes.map(code => console.log(code))
//   const resultArr = await Promise.all(
//     codes.map((code) => query(code, num))
//   )
//   process.exit(0)
//   console.log(resultArr.length, resultArr[0])
//   console.timeEnd('sql')

// }


// export const updateData = async (data) => {
//   try {
//     if (data && Array.isArray(data) && data.length > 0) {
//       await connection.execute(`INSERT INTO \`stocks_ma\` VALUES ` + data.join(','))
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }



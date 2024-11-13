import connection from "../utils/db.js";


// const updateStocks = async (values) => {
//   try {
//     const queryStr =
//       "replace into `stocks` (code, name, open_date, cur_price, is_open) values " +
//       values
//         .map((item) =>
//           `('${item.code}'`
//           + `,'${item.name}'`
//           + `,${item.open_date != null ? `'${item.open_date}'` : null}`
//           + `,${item.cur_price != null ? `'${item.cur_price}'` : null}`
//           + `,'${item.is_open}')`
//         )
//         .join(",");
//     // console.log("queryStr: ", queryStr);

//     await connection.query(queryStr);

//   } catch (err) {
//     console.log(err);
//   }
// }

// export default updateStocks

const updateStocks = async (values) => {
  try {
    const queryStr =
      "replace into `stocks` (" +
      "code" +
      ",name" +
      ",cur_price" +
      ",today_open" +
      ",yesterday_close" +
      ",percentage_change" +
      ",price_change" +
      ",volume" +
      ",amount" +
      ",volatility" +
      ",turnover_rate" +
      ",per" +
      ",qrr" +
      ",highest" +
      ",lowest" +
      ",total_market_value" +
      ",circulating_market_value" +
      ",growth_rate" +
      ",pbr" +
      ",60_days_percentage_change" +
      ",this_year_percentage_change" +
      ") values " +
      values
        .join(",");
    // console.log("queryStr: ", queryStr);

    await connection.query(queryStr);

  } catch (err) {
    console.log(err);
  }
}

export default updateStocks

import connection from "../utils/db.js";


const updateStocks = async (values) => {
  try {
    const queryStr =
      "replace into `stocks` (code, name, open_date, cur_price, is_open) values " +
      values
        .map((item) =>
          `('${item.code}'`
          + `,'${item.name}'`
          + `,${item.open_date != null ? `'${item.open_date}'` : null}`
          + `,${item.cur_price != null ? `'${item.cur_price}'` : null}`
          + `,'${item.is_open}')`
        )
        .join(",");
    // console.log("queryStr: ", queryStr);

    await connection.query(queryStr);

  } catch (err) {
    console.log(err);
  }
}

export default updateStocks

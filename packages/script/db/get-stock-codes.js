import connection from "../utils/db.js";

const getStockCodes = async () => {
  try {
    const queryStr =
      "select `code` from  `stocks` "
    const [result, fields] = await connection.query(queryStr);
    return result
  } catch (err) {
    console.log(err);
  }
}

export default getStockCodes

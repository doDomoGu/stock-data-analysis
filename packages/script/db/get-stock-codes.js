import connection from "../utils/db.js";

const getStockCodes = async () => {
  try {
    // const stockCode = '002'
    // const [re] = await connection.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'stock-data'`);
    // const dataTableNames = re.map(n => n.TABLE_NAME).filter(n => n.substring(0, 5) == 'data_').map(n => n.substring(5))
    // console.log(dataTableNames)
    // return []


    const [result, fields] = await connection.query("select `code` from  `stocks` order by `code` ASC");
    return result
  } catch (err) {
    console.log(err);
  }
}

export default getStockCodes

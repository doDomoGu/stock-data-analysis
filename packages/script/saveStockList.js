import connection from "./utils/db.js";

import stockListSettings from "./settings/stockList.js";

try {
  const queryStr =
    "replace into `stocks` (code, name) values " +
    stockListSettings
      .map((item) => `('${item.code}','${item.name}')`)
      .join(",");
  console.log("queryStr: ", queryStr);
  const [results] = await connection.query(queryStr);
  console.log(results);
} catch (err) {
  console.log(err);
}

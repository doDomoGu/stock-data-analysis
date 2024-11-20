import mysql from "mysql2/promise";

import dbconfig from "../dbconfig.js";

// Create the connection to database
const connection = await mysql.createConnection({
  ...dbconfig,
});

export const getConnection = async () => {
  return await mysql.createConnection({
    ...dbconfig,
  });
}

export default connection;

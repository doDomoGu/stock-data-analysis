const mysql = require('mysql2/promise')
const dbconfig = require('../dbconfig')
const getConnection = async () => await mysql.createConnection({
  ...dbconfig
})

module.exports = getConnection

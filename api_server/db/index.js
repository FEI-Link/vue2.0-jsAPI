const mysql = require('mysql')

const db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234qwer',
  database: 'learn'
})

module.exports = db
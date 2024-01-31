const mysql = require('mysql2/promise')

let pool

module.exports = function getPool() {
    if(pool) {
        return pool
    }
    //초기 pool 구성 . 즉 초기 connetion을 원하는 갯수만큼 만들어서 유지
    const config = {
        host: process.env.DB_URL,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        connectionLimit: 100
    }
    return mysql.createPool(config)
}
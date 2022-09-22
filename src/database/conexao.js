require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.HOST,
    port: process.env.PORT_POSTGRES,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

module.exports = pool;
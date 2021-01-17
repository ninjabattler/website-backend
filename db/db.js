const Pool= require("pg").Pool;
require('dotenv').config();
let pool;

if(process.env.DB_URL){
  pool = new Pool({
    connectionString: process.env.DB_URL
  });
} else {
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME
  });
}


module.exports = pool;
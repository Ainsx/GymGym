// backend bridge to PostgreSQL
// Load environment variables from .env
require('dotenv').config();
// Import Pool from postgres
const { Pool } = require('pg');
// Create a new pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
// testing
pool.connect()
  .then(() => console.log('success'))
  .catch(err => console.error('try again', err));
module.exports = pool;
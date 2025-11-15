require('dotenv').config(); //environment variables
const { networkInterfaces } = require('os');
var message = 'CSC-317 node/express app \n'
         + 'This uses nodeJS, express, and express.static\n'
         + 'to \"serve\" the files in the ./public/ dir!\n';

const session = require('express-session'); 
const cookieParser = require('cookie-parser');
//App Setup
var express = require('express');
var app = express();
var port = 3001;
var path = require('path');
const pool = require('./db/pool');//db connection
//middlware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true}));

//static files
const StaticDirectory = path.join(__dirname, 'public');
app.use(express.static(StaticDirectory));

// redirect to storefront.
app.get('/', (req, res) => {
    console.log("redirecting to storefront");
    res.redirect('/storefront.html');
  });

// ---> API ROUTeS <----
// ----ALL CATEGORIES ----
app.get('/api/categories', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories ORDER BY id');
    res.json({ categories: rows });
  } catch (err) {
    console.error('try again', err);
    res.status(500).json({ error: 'Server error' });
  }
});
///////products///////////
app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    let query = `
      SELECT p.*, c.name AS category
      FROM products p
      JOIN categories c ON p.category_id = c.id
    `;
    const params = [];

    if (category) {
      query += ` WHERE LOWER(c.name) = LOWER($1)`;
      params.push(category);
    }

    const { rows } = await pool.query(query, params);
    res.json({ products: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
// Best seller
app.get('/api/products/best', async (req, res) => {
  try {
    // Fetch random 8 products
    const { rows } = await pool.query(`
      SELECT p.*, c.name AS category
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ORDER BY RANDOM()
      LIMIT 8
    `);
    res.json({ products: rows });
  } catch (err) {
    console.error('try again', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// SINGLE PRODUCT (Item detail page)
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(`
      SELECT p.*, c.name AS category
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1
    `, [id]);

    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Search Route
app.get('/api/search', async (req, res) => {
  const{ q } = req.query;
  if(!q) return res.json({products: []});
try {
    const { rows } = await pool.query(
      `SELECT p.*, c.name AS category
       FROM products p
       JOIN categories c ON p.category_id = c.id
       WHERE LOWER(p.name) LIKE LOWER($1)
          OR LOWER(p.description) LIKE LOWER($1)
          OR LOWER(c.name) LIKE LOWER($1)`,
      [`%${q}%`]
    );
    res.json({ products: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
})
//start server
app.listen(port, () => {
    console.log(`Listening on http://127.0.0.1:${port}/`);
});
console.log(
  'CSC-317 group project milestone 3 '
);
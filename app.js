var express = require('express');
var app = express();
const cors = require('cors');

app.use(cors());
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'customers',
  password: 'Eswari@123',
  port: 5432,
});

app.get('/customers', async (req, res) => {
  const { page = 1, limit = 20, search = '' } = req.query;
  const offset = (page - 1) * limit;

  try {
    const query = {
      text: `SELECT sno, customer_name, age, phone, location,
                    TO_CHAR(created_at, 'YYYY-MM-DD') AS date,
                    TO_CHAR(created_at, 'HH24:MI:SS') AS time
             FROM customers
             WHERE customer_name ILIKE $1 OR location ILIKE $1
             ORDER BY sno
             LIMIT $2 OFFSET $3`,
      values: [`%${search}%`, limit, offset],
    };

    const { rows } = await pool.query(query);
    console.log('fetch')
    console.log(rows)
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}..`);
});

module.exports = app;

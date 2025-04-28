const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kumar', // change this to your actual password
  database: 'money_mate',
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Add expense
app.post('/add-expense', (req, res) => {
  const { name, amount, date, category } = req.body;
  const sql = 'INSERT INTO expenses (name, amount, date, category) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, amount, date, category], (err, result) => {
    if (err) throw err;
    res.send('Expense added');
  });
});

// Get all expenses
app.get('/get-expenses', (req, res) => {
  db.query('SELECT * FROM expenses', (err, results) => {
    if (err) {
      console.error('Error fetching expenses:', err);
      res.status(500).send('Error');
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



  

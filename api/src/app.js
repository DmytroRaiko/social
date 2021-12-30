const express = require('express');

const app = express();
const { Pool } = require('pg');
const config = require('./services/config');

const port = config.appPort;

const pool = new Pool({
  user: config.dbUser,
  host: config.dbHost,
  database: config.db,
  password: config.dbPass,
  port: config.dbPort,
});

app.get('/', (req, res) => {
  pool.query('SELECT profileid, email, name FROM profile', (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json(results.rows);
    }
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at http://localhost:${port}`)
});

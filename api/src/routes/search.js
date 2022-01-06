const router = require('express').Router();
// const db = require('../services/db');

router.get('/', (req, res) => {
  res
    .status(404)
    .send({ message: 'Search! This module will be available yet' });
});

module.exports = router;

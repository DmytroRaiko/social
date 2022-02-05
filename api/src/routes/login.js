const router = require('express').Router();

router.get('/', (req, res) => {
  res.cookie('profileid', '1', {
    maxAge: 1000000,
    path: '/',
  });
  res.send('Good');
});

module.exports = router;

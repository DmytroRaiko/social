const router = require('express').Router();

router.get('/', (req, res) => {
  res.setHeader('Set-Cookie', 'profileid=1;max-age=1000000; path=/');
  res.send('Good');
});

module.exports = router;

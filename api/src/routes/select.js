const router = require('express').Router();
const middleAsync = require('../middlewares/async');
const selectControllers = require('../controllers/select');

router.get(
  '/availability',
  middleAsync(async (req, res) => selectControllers.getAvailability(req, res))
);

router.get(
  '/universities',
  middleAsync(async (req, res) => selectControllers.getUniversities(req, res))
);

module.exports = router;

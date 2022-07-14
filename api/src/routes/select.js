const router = require('express').Router();
const middleAsync = require('../middlewares/async');
const selectControllers = require('../controllers/select');
const bodyValidation = require('../middlewares/bodyValidation');
const { addUniversity } = require('../services/validation/select.validation');
const { isUniqueUniversity } = require('../services/store/universities.services');
const auth = require('../middlewares/auth');

router.get(
  '/availability',
  middleAsync(async (req, res) => selectControllers.getAvailability(req, res))
);

router.get(
  '/universities',
  middleAsync(async (req, res) => selectControllers.getUniversities(req, res))
);

router.post(
  '/university',
  auth,
  bodyValidation(addUniversity, {
    name: { unique: (req) => isUniqueUniversity(req?.body?.name) },
  }),
  middleAsync(async (req, res) => selectControllers.addUniversity(req, res))
);

module.exports = router;

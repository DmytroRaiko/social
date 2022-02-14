const router = require('express').Router();
const selectServices = require('../services/store/select.services');
const middleAsync = require('../middlewares/async');
const auth = require('../middlewares/auth');

router.use(auth);

router.get(
  '/availability',
  middleAsync(async (req, res) => {
    const availability = await selectServices.getAvailability();

    if (availability && Object.keys(availability).length) {
      res
        .status(200)
        .send({ message: 'Show posts', data: availability, success: true });
    } else {
      res
        .status(404)
        .send({ message: 'Fetching availability', success: false });
    }
  })
);

router.get(
  '/universities',
  middleAsync(async (req, res) => {
    const universities = await selectServices.getUniversities();

    if (universities && Object.keys(universities).length) {
      res
        .status(200)
        .send({ message: 'Show posts', data: universities, success: true });
    } else {
      res
        .status(404)
        .send({ message: 'Fetching universities', success: false });
    }
  })
);

module.exports = router;

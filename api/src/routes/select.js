const router = require('express').Router();
const selectServices = require('../services/store/select.services');
const middleAsync = require('../middlewares/async');
const auth = require('../middlewares/auth');
const NotFoundException = require('../services/errors/NotFoundException');

router.use(auth);

router.get(
  '/availability',
  middleAsync(async (req, res) => {
    const availability = await selectServices.getAvailability();

    if (availability && Object.keys(availability).length) {
      res.send({ message: 'Show posts', data: availability, success: true });
    } else {
      throw new NotFoundException('Availability');
    }
  })
);

router.get(
  '/universities',
  middleAsync(async (req, res) => {
    const universities = await selectServices.getUniversities();

    if (universities && Object.keys(universities).length) {
      res.send({ message: 'Show posts', data: universities, success: true });
    } else {
      throw new NotFoundException('Universities');
    }
  })
);

module.exports = router;

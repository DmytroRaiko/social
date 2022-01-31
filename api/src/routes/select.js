const router = require('express').Router();
const selectServices = require('../services/store/select.services');

router.get('/availability', async (req, res) => {
  try {
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
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Data fetching error', error, success: false });
  }
});

router.get('/universities', async (req, res) => {
  try {
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
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Data fetching error', error, success: false });
  }
});

module.exports = router;

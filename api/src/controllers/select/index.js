const selectServices = require('../../services/store/select.services');
const NotFoundException = require('../../services/errors/NotFoundException');

module.exports = {
  getAvailability: async (req, res) => {
    const availability = await selectServices.getAvailability();

    if (availability && Object.keys(availability).length) {
      res.send({ message: 'Show posts', data: availability, success: true });
    } else {
      throw new NotFoundException('Availability');
    }
  },

  getUniversities: async (req, res) => {
    const universities = await selectServices.getUniversities();

    if (universities && Object.keys(universities).length) {
      res.send({ message: 'Show posts', data: universities, success: true });
    } else {
      throw new NotFoundException('Universities');
    }
  },
};

const selectServices = require('../../services/store/select.services');
const NotFoundException = require('../../services/errors/NotFoundException');
const { addUniversity } = require('../../services/store/universities.services');

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

  addUniversity: async (req, res) => {
    const university = await addUniversity(req.body);

    if (university && Object.keys(university).length) {
      res.send({ message: 'Show posts', data: university, success: true });
    } else {
      throw new NotFoundException('Universities');
    }
  }
};

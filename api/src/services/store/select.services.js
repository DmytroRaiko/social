const db = require('../db');

module.exports = {
  getAvailability: async () =>
    db
      .select('availabilityId as value', 'availability as label')
      .from('Availability'),

  getAvailabilitiesIds: async () =>
    db
      .select('availabilityId')
      .from('Availability')
      .pluck('availabilityId'),

  getUniversities: async () =>
    db
      .select('universityId as value', 'name as label')
      .from('University'),
};

const db = require('../db');

module.exports = {
  getAvailability: async () =>
    db
      .select('availabilityid as value', 'availability as label')
      .from('availability'),

  getAvailabilitiesIds: async () =>
    db
      .select('availabilityid')
      .from('availability')
      .pluck('availabilityid'),

  getUniversities: async () =>
    db
      .select('universityid as value', 'name as label')
      .from('university'),
};

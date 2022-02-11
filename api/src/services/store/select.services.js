const db = require('../db');

module.exports = {
  getAvailability: async () =>
    db
      .select('availabilityid as value', 'availability as label')
      .from('availability'),
  getUniversities: async () =>
    db
      .select('universityid as value', 'name as label')
      .from('university')
      .limit(10),
};

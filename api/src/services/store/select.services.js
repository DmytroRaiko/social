const db = require('../db');

module.exports = {
  getAvailability: async () => db.select().from('availability'),
  getUniversities: async () => db.select().from('university').limit(10),
};

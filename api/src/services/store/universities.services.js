const db = require('../db');

module.exports = {
  getUniversities: async () => db.select().from('university'),
  getProfileUniversities: async (profileId) =>
    db
      .select('university.name', 'university.universityid')
      .from('universitylist')
      .join(
        'university',
        'university.universityid',
        '=',
        'universitylist.universityid'
      )
      .where('profileid', profileId),
  getProfileEditUniversities: async (profileId) =>
    db
      .select('university.universityid', 'university.name')
      .from('universitylist')
      .join(
        'university',
        'university.universityid',
        '=',
        'universitylist.universityid'
      )
      .where('profileid', profileId),
  addUniversity: async (insertData) => db('university').insert(insertData).returning(['university.name', 'university.universityid']),
  updateUniversity: async (updateData, universityId) =>
    db('university').insert(updateData).where('universityid', universityId),
  deleteUniversity: async (universityId) =>
    db.from('university').where('universityid', universityId).delete(),

  isUniqueUniversity: async (name) => (await db.select().first().from('university').where('name', name))?.universityid,
};

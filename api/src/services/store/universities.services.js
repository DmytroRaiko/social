const db = require('../db');

module.exports = {
  getUniversities: async () => db.select().from('university').limit(10),
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
      .select('university.universityid')
      .from('universitylist')
      .join(
        'university',
        'university.universityid',
        '=',
        'universitylist.universityid'
      )
      .where('profileid', profileId),
  addUniversity: async (insertData) => db('universityId').insert(insertData),
  updateUniversity: async (updateData, universityId) =>
    db('university').insert(updateData).where('universityid', universityId),
  deleteUniversity: async (universityId) =>
    db.from('university').where('universityid', universityId).delete(),
};

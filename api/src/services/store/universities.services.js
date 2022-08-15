const db = require('../db');

module.exports = {
  getUniversities: async () => db.select().from('University'),
  getProfileUniversities: async (profileId) =>
    db
      .select('University.name', 'University.universityId')
      .from('UniversityList')
      .join(
        'University',
        'University.universityId',
        '=',
        'UniversityList.universityId'
      )
      .where('profileId', profileId),
  getProfileEditUniversities: async (profileId) =>
    db
      .select('University.universityId', 'University.name')
      .from('UniversityList')
      .join(
        'University',
        'University.universityId',
        '=',
        'UniversityList.universityId'
      )
      .where('profileId', profileId),
  addUniversity: async (insertData) => db('University').insert(insertData).returning(['University.name', 'University.universityId']),
  updateUniversity: async (updateData, universityId) =>
    db('University').insert(updateData).where('universityId', universityId),
  deleteUniversity: async (universityId) =>
    db.from('University').where('universityId', universityId).delete(),

  addUniversityList: async (profileId, universityId) =>
    db('UniversityList')
      .insert({ profileId, universityId }),

  deleteUniversityList: async (profileId, universityId) =>
    db
      .from('UniversityList')
      .delete()
      .where('profileId', profileId)
      .andWhere('universityId', universityId),

  isUniqueUniversity: async (name) => (await db.select().first().from('University').where('name', name))?.universityId,
};

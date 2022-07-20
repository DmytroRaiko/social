const db = require('../db');

module.exports = {
  getProfileAvatar: async (profileId) =>
    db.select('avatarLink').from('Profile').where('profileId', profileId),
  updateProfileAvatar: async (profileId, avatar) =>
    db('Profile').where('profileId', profileId).update('avatarLink', avatar),
  deleteProfileAvatar: async (profileId) =>
    db('Profile').where('profileId', profileId).update('avatarLink', null),
};

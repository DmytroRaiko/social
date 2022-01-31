const db = require('../db');

module.exports = {
  getProfileAvatar: async (profileId) =>
    db.select('avatarlink').from('profile').where('profileid', profileId),
  updateProfileAvatar: async (profileid, avatar) =>
    db('profile').where('profileid', profileid).update('avatarlink', avatar),
  deleteProfileAvatar: async (profileid) =>
    db('profile').where('profileid', profileid).update('avatarlink', null),
};

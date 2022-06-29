const db = require('../db');

module.exports = {
  getUserByEmail: async (email) =>
    db.first().select('profileid', 'name', 'email', 'password', 'avatarlink').from('profile').where('email', '=', email),
  getUserById: async (profileId) =>
    db.first().select('profileid', 'name', 'email', 'avatarlink').from('profile').where('profileid', profileId),
  getSessionByToken: async (token) =>
    db.select().first().from('oauthlist').where('accesstoken', '=', token),
  addSession: async (data) => db('oauthlist').insert(data),
  deleteSessionByToken: async (token) =>
    db('oauthlist').where('accesstoken', '=', token).del(),
  deleteSessionById: async (profileId) =>
    db('oauthlist').where('profileid', '=', profileId).del(),
  activateProfile: async (hash) => db('profile').update({ isActivated: true }).where('activateLink', hash),
  google: {
    selectProfileByGoogleTokenId: async (profileId) =>
      db.select().first().from('profile').where('googleid', '=', profileId),
  },
  facebook: {
    selectProfileByFacebookTokenId: async (profileId) =>
      db.select().first().from('profile').where('facebookid', '=', profileId),
  },
  resetPassword: (hash, password) =>
    db('profile').update({ password, isActivated: true }).where('activateLink', hash),
};

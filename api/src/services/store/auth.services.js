const db = require('../db');

module.exports = {
  getUserByEmail: async (email) =>
    db
      .first()
      .select('profileId', 'name', 'email', 'password', 'avatarLink')
      .from('Profile').where('email', '=', email),
  getUserById: async (profileId) =>
    db
      .first()
      .select('profileId', 'name', 'email', 'avatarLink')
      .from('Profile')
      .where('profileId', profileId),
  getSessionByToken: async (token) =>
    db.select().first().from('OAuthList').where('accessToken', '=', token),
  addSession: async (data) => db('OAuthList').insert(data),
  deleteSessionByToken: async (token) =>
    db('OAuthList').where('accessToken', '=', token).del(),
  deleteSessionById: async (profileId) =>
    db('OAuthList').where('profileId', '=', profileId).del(),
  activateProfile: async (hash) => db('Profile').update({ isActivated: true }).where('activateLink', hash),
  google: {
    selectProfileByGoogleTokenId: async (profileId, email) =>
      db
        .select()
        .first()
        .from('Profile').where('googleId', profileId)
        .orWhere('email', email),
  },
  facebook: {
    selectProfileByFacebookTokenId: async (profileId) =>
      db.select().first().from('Profile').where('facebookId', '=', profileId),
  },
  resetPassword: (hash, password) =>
    db('Profile').update({ password, isActivated: true }).where('activateLink', hash),
};

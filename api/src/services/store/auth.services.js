const db = require('../db');

module.exports = {
  getUserByEmail: async (email) =>
    db.first().select().from('profile').where('email', '=', email),
  getSessionByToken: async (token) =>
    db.select().first().from('oauthlist').where('accesstoken', '=', token),
  addSession: async (data) => db('oauthlist').insert(data),
  deleteSessionByToken: async (token) =>
    db('oauthlist').where('accesstoken', '=', token).del(),
  deleteSessionById: async (profileId) =>
    db('oauthlist').where('profileid', '=', profileId).del(),
};

const db = require('../db');

module.exports = {
  isUniqueEmail: async (email) => (await db.select().first().from('profile').where('email', email))?.profileid,

  getProfileByEmail: async (email) =>
    db.select().first().from('profile').where('email', email),

  getProfiles: async (offset = 0, limit = 30) =>
    db
      .select('profile.profileid', 'profile.avatarlink', 'profile.name')
      .from('profile')
      .offset(offset)
      .limit(limit),

  getProfile: async (profileId) =>
    db
      .select(
        'profile.*',
        'a1.availability as emailsetting',
        'a2.availability as phonesetting',
        'a3.availability as universitysetting',
        db
          .count()
          .from('friend')
          .leftJoin(
            'accessfriend',
            'friend.accessfriendid',
            '=',
            'accessfriend.accessfriendid'
          )
          .where('accessfriend.role', '=', 'Friends')
          .andWhere('friend.requestuserid', '=', profileId)
          .orWhere('friend.responduserid', '=', profileId)
          .as('countfriends'),
        db
          .count()
          .from('post')
          .where('post.profileid', '=', profileId)
          .as('countposts')
      )
      .from('profile')
      .join(
        'profilesetting',
        'profilesetting.profileid',
        '=',
        'profile.profileid'
      )
      .as('settingsTable')
      .join(
        'availability as a1',
        'profilesetting.emailsettingid',
        '=',
        'a1.availabilityid'
      )
      .join(
        'availability as a2',
        'profilesetting.phonesettingid',
        '=',
        'a2.availabilityid'
      )
      .join(
        'availability as a3',
        'profilesetting.universitysettingid',
        '=',
        'a3.availabilityid'
      )
      .where('profile.profileid', profileId),

  getEditProfile: async (profileId) =>
    db
      .select(
        'profile.name',
        'profile.phone',
        'profile.email',
        'profile.avatarlink',
        'profile.profileid',
        'a1.availabilityid as emailsettingid',
        'a1.availability as emailsetting',
        'a2.availabilityid as phonesettingid',
        'a2.availability as phonesetting',
        'a3.availabilityid as universitysettingid',
        'a3.availability as universitysetting'
      )
      .from('profile')
      .join(
        'profilesetting',
        'profilesetting.profileid',
        '=',
        'profile.profileid'
      )
      .as('settingsTable')
      .join(
        'availability as a1',
        'profilesetting.emailsettingid',
        '=',
        'a1.availabilityid'
      )
      .join(
        'availability as a2',
        'profilesetting.phonesettingid',
        '=',
        'a2.availabilityid'
      )
      .join(
        'availability as a3',
        'profilesetting.universitysettingid',
        '=',
        'a3.availabilityid'
      )
      .where('profile.profileid', profileId),
  addProfile: async (insertData) => db('profile').insert(insertData).returning(['profileid', 'email', 'name', 'isActivated', 'avatarlink']),

  updateProfile: async (updateData, profileId) =>
    db('profile').update(updateData).where('profileid', profileId),

  deleteProfile: async (profileId) =>
    db.from('profile').where('profileid', profileId).delete(),

  getProfileById: async (id) =>
    db.select().first().from('profile').where('profileid', '=', id),

  getRole: async (id) =>
    db.select('role').first().from('profile').where('profileid', '=', id),
};

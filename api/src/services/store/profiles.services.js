const db = require('../db');

module.exports = {
  isUniqueEmail: async (email) => (await db.select().first().from('Profile').where('email', email))?.profileId,

  getProfileByEmail: async (email) =>
    db.select().first().from('Profile').where('email', email),

  search: async (searchRow) =>
    db
      .select('Profile.profileId', 'Profile.avatarLink', 'Profile.name')
      .from('Profile')
      .where('Profile.name', 'like', `%${searchRow}%`)
      .limit(50),

  getProfiles: async (offset = 0, limit = 30) =>
    db
      .select('Profile.profileId', 'Profile.avatarLink', 'Profile.name')
      .from('Profile')
      .offset(offset)
      .limit(limit),

  getProfile: async (profileId) =>
    db
      .select(
        'Profile.*',
        'a1.availability as emailSetting',
        'a2.availability as phoneSetting',
        'a3.availability as universitySetting',
        db
          .count()
          .from('Friend')
          .leftJoin(
            'AccessFriend',
            'Friend.accessFriendId',
            '=',
            'AccessFriend.accessFriendId'
          )
          .where('AccessFriend.role', '=', 'Friends')
          .andWhere('Friend.requestUserId', '=', profileId)
          .orWhere('Friend.respondUserId', '=', profileId)
          .as('countFriends'),
        db
          .count()
          .from('Post')
          .where('Post.profileId', '=', profileId)
          .as('countPosts')
      )
      .from('Profile')
      .join(
        'ProfileSetting',
        'ProfileSetting.profileId',
        '=',
        'Profile.profileId'
      )
      .as('settingsTable')
      .join(
        'Availability as a1',
        'ProfileSetting.emailSettingId',
        '=',
        'a1.availabilityId'
      )
      .join(
        'Availability as a2',
        'ProfileSetting.phoneSettingId',
        '=',
        'a2.availabilityId'
      )
      .join(
        'Availability as a3',
        'ProfileSetting.universitySettingId',
        '=',
        'a3.availabilityId'
      )
      .where('Profile.profileId', profileId),

  getEditProfile: async (profileId) =>
    db
      .select(
        'Profile.name',
        'Profile.phone',
        'Profile.email',
        'Profile.avatarLink',
        'Profile.profileId',
        'a1.availabilityId as emailSettingId',
        'a1.availability as emailSetting',
        'a2.availabilityId as phoneSettingId',
        'a2.availability as phoneSetting',
        'a3.availabilityId as universitySettingId',
        'a3.availability as universitySetting'
      )
      .from('Profile')
      .join(
        'ProfileSetting',
        'ProfileSetting.profileId',
        '=',
        'Profile.profileId'
      )
      .as('settingsTable')
      .join(
        'Availability as a1',
        'ProfileSetting.emailSettingId',
        '=',
        'a1.availabilityId'
      )
      .join(
        'Availability as a2',
        'ProfileSetting.phoneSettingId',
        '=',
        'a2.availabilityId'
      )
      .join(
        'Availability as a3',
        'ProfileSetting.universitySettingId',
        '=',
        'a3.availabilityId'
      )
      .where('Profile.profileId', profileId),
  addProfile: async (insertData) => db('Profile').insert(insertData).returning(['profileId', 'email', 'name', 'isActivated', 'avatarLink']),

  updateProfile: async (updateData, profileId) =>
    db('Profile').update(updateData).where('profileId', profileId),

  updateSettings: async (updateData, profileId) =>
    db('ProfileSetting').update(updateData).where('profileId', profileId),

  deleteProfile: async (profileId) =>
    db.from('Profile').where('profileId', profileId).delete(),

  getProfileById: async (id) =>
    db.select().first().from('Profile').where('profileId', '=', id),

  getRole: async (id) =>
    db.select('role').first().from('Profile').where('profileId', '=', id),

  getProfileUniversities: async (profileId) =>
    db
      .select('universityId')
      .from('UniversityList')
      .where('profileId', profileId)
      .pluck('universityId'),
};

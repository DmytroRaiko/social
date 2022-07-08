const db = require('../db');

module.exports = {
  getLikes: async (postId, offset = 0, limit = 50) =>
    db
      .select(
        'profile.profileid',
        'profile.name',
        'profile.avatarlink',
        'postlike.postlikeid'
      )
      .from('postlike')
      .join('profile', 'profile.profileid', '=', 'postlike.profileid')
      .where('postid', postId)
      .offset(offset)
      .limit(limit),
  getMyLike: async (postId, profileId) => db
    .select('postlikeid as postLikeId')
    .from('postlike')
    .where('postid', postId)
    .andWhere('profileid', profileId)
    .first(),
  getLikeInfo: async (profileId, postId) =>
    db
      .select()
      .first()
      .from('postlike')
      .where('postid', '=', postId)
      .andWhere('profileid', '=', profileId),
  addLike: async (insertData) => db('postlike').insert(insertData),
  deleteLike: async (postId, profileId) =>
    db
      .from('postlike')
      .where('postid', postId)
      .andWhere('profileid', profileId)
      .delete(),
};

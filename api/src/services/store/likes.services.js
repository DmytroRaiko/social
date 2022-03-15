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
  getLikeInfo: async (likeId, postId) =>
    db
      .select()
      .first()
      .from('postlike')
      .where('postlikeid', '=', likeId)
      .andWhere('postid', '=', postId),
  addLike: async (insertData) => db('postlike').insert(insertData),
  deleteLike: async (postId, profileId) =>
    db
      .from('postlike')
      .where('postid', postId)
      .andWhere('profileid', profileId)
      .delete(),
};

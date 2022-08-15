const db = require('../db');

module.exports = {
  getLikes: async (postId) =>
    db
      .select(
        'profile.profileid',
        'profile.name',
        'profile.avatarlink',
        'postview.postviewid as postlikeid'
      )
      .from('postview')
      .join('profile', 'profile.profileid', '=', 'postview.profileid')
      .where('postid', postId)
      .andWhere('liked', 1)
      .orderBy('timeLike', 'DESC'),
  getMyLike: async (postId, profileId) => db
    .select('postviewid as postLikeId')
    .from('postview')
    .where('postid', postId)
    .andWhere('profileid', profileId)
    .andWhere('liked', 1)
    .first(),
  getLikeInfo: async (profileId, postId) =>
    db
      .select()
      .first()
      .from('postview')
      .where('postid', '=', postId)
      .andWhere('profileid', '=', profileId),
  addLike: async (postId, profileId) =>
    db('postview')
      .update({ liked: 1, timeLike: new Date() })
      .where('postid', postId)
      .andWhere('profileid', profileId),
  deleteLike: async (postId, profileId) =>
    db('postview')
      .update({ liked: 0, timeLike: null })
      .where('postid', postId)
      .andWhere('profileid', profileId),
};

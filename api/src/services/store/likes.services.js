const db = require('../db');

module.exports = {
  getLikes: async (postId) =>
    db
      .select(
        'Profile.profileId',
        'Profile.name',
        'Profile.avatarLink',
        'PostView.postViewId as postLikeId'
      )
      .from('PostView')
      .join('Profile', 'Profile.profileId', '=', 'PostView.profileId')
      .where('postId', postId)
      .andWhere('liked', 1)
      .orderBy('timeLike', 'DESC'),
  getMyLike: async (postId, profileId) => db
    .select('postViewId as postLikeId')
    .from('PostView')
    .where('postId', postId)
    .andWhere('profileId', profileId)
    .andWhere('liked', 1)
    .first(),
  getLikeInfo: async (profileId, postId) =>
    db
      .select()
      .first()
      .from('PostView')
      .where('postId', '=', postId)
      .andWhere('profileId', '=', profileId),
  addLike: async (postId, profileId) =>
    db('PostView')
      .update({ liked: 1, timeLike: new Date() })
      .where('postId', postId)
      .andWhere('profileId', profileId),
  deleteLike: async (postId, profileId) =>
    db('PostView')
      .update({ liked: 0, timeLike: null })
      .where('postId', postId)
      .andWhere('profileId', profileId),
};

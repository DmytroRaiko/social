const db = require('../db');

module.exports = {
  getAllPosts: async (profileId, offset = 0, limit = 10) =>
    db
      .select(
        'post.*',
        'profile.profileid',
        'profile.name',
        'profile.avatarlink',
      )
      .from('profile')
      .join('post', 'post.profileid', '=', 'profile.profileid')
      .whereNotIn(
        'post.postid',
        db
          .distinct()
          .select('postid')
          .from('postview')
          .where('profileid', profileId)
      )
      .orderBy('post.timepost', 'DESC')
      .offset(offset)
      .limit(limit),

  getAllSeenPosts: async (profileId, offset = 0, limit = 10) =>
    db
      .select(
        'post.*',
        'profile.profileid',
        'profile.name',
        'profile.avatarlink',
        'postview.viewDate',
      )
      .from('profile')
      .join('post', 'post.profileid', '=', 'profile.profileid')
      .join('postview', 'postview.postid', '=', 'post.postid')
      .where('postview.profileid', profileId)
      .orderBy('postview.viewDate', 'DESC')
      .offset(offset)
      .limit(limit),

  getAllUserPosts: async (profileId, userProfileId, offset = 0, limit = 10) =>
    db
      .select(
        'post.*',
        'profile.profileid',
        'profile.name',
        'profile.avatarlink',
      )
      .from('post')
      .join('profile', 'post.profileid', '=', 'profile.profileid')
      .where('post.profileid', '=', profileId)
      .orderBy('post.timepost', 'DESC')
      .offset(offset)
      .limit(limit),
  getPost: async (profileId, postId) =>
    db
      .select(
        'profile.profileid',
        'profile.name',
        'profile.avatarlink',
        'post.*',
      )
      .first()
      .from('profile')
      .join('post', 'post.profileid', '=', 'profile.profileid')
      .where('post.postid', '=', postId),
  getPostInfo: async (postId) =>
    db.select().first().from('post').where('postid', '=', postId),
  getPostEdit: async (postId) =>
    db
      .select(
        'post.text',
        'post.imagelink',
        'availability.availabilityid',
        'availability.availability'
      )
      .first()
      .from('post')
      .join(
        'availability',
        'post.postavailabilityid',
        '=',
        'availability.availabilityid'
      )
      .where('postid', postId),
  addPost: async (insertData) => db('post').insert(insertData),
  getPostImageName: async (postId) =>
    db.select('imagelink').first().from('post').where('postid', '=', postId),
  updatePost: async (updateData, postId) =>
    db('post').update(updateData).where('postid', '=', postId),
  deletePost: async (postId) =>
    db.from('post').where('postid', postId).delete(),
  isView: async (postId, profileId) =>
    db.select().first().from('postview').where('postid', postId)
      .andWhere('profileid', profileId),
  viewPost: async (postId, profileId) =>
    db('postview').insert({ postid: postId, profileid: profileId }),

  getStatistic: async (postId) =>
    db.select().from('poststatistic').where('postId', postId).first(),

  updatePostAmountViews: async (postId, data) =>
    db.raw(`UPDATE poststatistic SET "totalViews" = "totalViews"${data}1 WHERE "postId" = ${postId}`),

  updatePostAmountLikes: async (postId, data) =>
    db.raw(`UPDATE poststatistic SET "totalLikes" = "totalLikes"${data}1 WHERE "postId" = ${postId}`),

  updatePostAmountComments: async (postId, data) =>
    db.raw(`UPDATE poststatistic SET "totalComments" = "totalComments"${data}1 WHERE "postId" = ${postId}`),
};

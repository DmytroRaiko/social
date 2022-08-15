const db = require('../db');

module.exports = {
  getAllPosts: async (profileId, offset = 0, limit = 10) =>
    db
      .select(
        'Post.*',
        'Profile.profileId',
        'Profile.name',
        'Profile.avatarLink',
      )
      .from('Profile')
      .join('Post', 'Post.profileId', '=', 'Profile.profileId')
      .whereNotIn(
        'Post.postId',
        db
          .select('postId')
          .from('PostView')
          .where('profileId', profileId)
          .andWhereRaw('"PostView"."postId" = "Post"."postId"')
      )
      .orderBy('Post.timePost', 'DESC')
      .offset(offset)
      .limit(limit),

  getAllSeenPosts: async (profileId, offset = 0, limit = 10) =>
    db
      .select(
        'Post.*',
        'Profile.profileId',
        'Profile.name',
        'Profile.avatarLink',
        'PostView.viewDate',
      )
      .from('Profile')
      .join('Post', 'Post.profileId', '=', 'Profile.profileId')
      .join('PostView', 'PostView.postId', '=', 'Post.postId')
      .where('PostView.profileId', profileId)
      .orderBy('PostView.viewDate', 'DESC')
      .offset(offset)
      .limit(limit),

  getAllUserPosts: async (profileId, userProfileId, offset = 0, limit = 10) =>
    db
      .select(
        'Post.*',
        'Profile.profileId',
        'Profile.name',
        'Profile.avatarLink',
      )
      .from('Post')
      .join('Profile', 'Post.profileId', '=', 'Profile.profileId')
      .where('Post.profileId', '=', profileId)
      .orderBy('Post.timePost', 'DESC')
      .offset(offset)
      .limit(limit),
  getPost: async (profileId, postId) =>
    db
      .select(
        'Profile.profileId',
        'Profile.name',
        'Profile.avatarLink',
        'Post.*',
      )
      .first()
      .from('Profile')
      .join('Post', 'Post.profileId', '=', 'Profile.profileId')
      .where('Post.postId', '=', postId),
  getPostInfo: async (postId) =>
    db.select().first().from('Post').where('postId', '=', postId),
  getPostEdit: async (postId) =>
    db
      .select(
        'Post.text',
        'Post.imageLink',
        'Availability.availabilityId',
        'Availability.availability'
      )
      .first()
      .from('Post')
      .join(
        'Availability',
        'Post.postAvailabilityId',
        '=',
        'Availability.availabilityId'
      )
      .where('postId', postId),
  addPost: async (insertData) => db('Post').insert(insertData),
  getPostImageName: async (postId) =>
    db.select('imageLink').first().from('Post').where('postId', '=', postId),
  updatePost: async (updateData, postId) =>
    db('Post').update(updateData).where('postId', '=', postId),
  deletePost: async (postId) =>
    db.from('Post').where('postId', postId).delete(),
  isView: async (postId, profileId) =>
    db.select().first().from('PostView').where('postId', postId)
      .andWhere('profileId', profileId),
  viewPost: async (postId, profileId) =>
    db('PostView').insert({ postId, profileId }),

  getStatistic: async (postId) =>
    db.select().from('PostStatistic').where('postId', postId).first(),

  updatePostAmountViews: async (postId, data) =>
    db.raw(`UPDATE "PostStatistic" SET "totalViews" = "totalViews"${data}1 WHERE "postId" = ${postId}`),

  updatePostAmountLikes: async (postId, data) =>
    db.raw(`UPDATE "PostStatistic" SET "totalLikes" = "totalLikes"${data}1 WHERE "postId" = ${postId}`),

  updatePostAmountComments: async (postId, data) =>
    db.raw(`UPDATE "PostStatistic" SET "totalComments" = "totalComments"${data}1 WHERE "postId" = ${postId}`),
};

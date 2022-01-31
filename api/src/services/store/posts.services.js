const db = require('../db');

module.exports = {
  getAllPosts: async (profileId, offset = 0, limit = 15) =>
    db
      .select(
        'profile.profileid',
        'profile.name',
        'profile.avatarlink',
        'post.*',
        'poststatistic.*',
        'mylike.postlikeid'
      )
      .from('profile')
      .join('post', 'post.profileid', '=', 'profile.profileid')
      .join('poststatistic', 'poststatistic.postid', '=', 'post.postid')
      .leftJoin(
        db
          .select('postlikeid', 'postid', 'profile.profileid')
          .from('postlike')
          .leftJoin('profile', 'profile.profileid', '=', 'postlike.profileid')
          .where('profile.profileid', '=', profileId)
          .as('mylike'),
        'post.postid',
        '=',
        'mylike.postid'
      )
      .orderBy('post.timepost', 'DESC')
      .offset(offset)
      .limit(limit),
  getAllUserPosts: async (profileId, userProfileId, offset = 0, limit = 20) =>
    db
      .select(
        'post.*',
        'profile.profileid',
        'profile.name',
        'profile.avatarlink',
        'poststatistic.*',
        'mylike.postlikeid'
      )
      .from('post')
      .join('profile', 'post.profileid', '=', 'profile.profileid')
      .join('poststatistic', 'poststatistic.postid', '=', 'post.postid')
      .leftJoin(
        db
          .select('postlikeid', 'postid', 'profile.profileid')
          .from('postlike')
          .leftJoin('profile', 'profile.profileid', '=', 'postlike.profileid')
          .where('profile.profileid', '=', userProfileId)
          .as('mylike'),
        'post.postid',
        '=',
        'mylike.postid'
      )
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
        'poststatistic.*',
        'mylike.postlikeid'
      )
      .from('profile')
      .join('post', 'post.profileid', '=', 'profile.profileid')
      .join('poststatistic', 'poststatistic.postid', '=', 'post.postid')
      .leftJoin(
        db
          .select('postlikeid', 'postid', 'profile.profileid')
          .from('postlike')
          .leftJoin('profile', 'profile.profileid', '=', 'postlike.profileid')
          .where('profile.profileid', '=', profileId)
          .as('mylike'),
        'post.postid',
        '=',
        'mylike.postid'
      )
      .where('post.postid', '=', postId),
  getPostEdit: async (postId) =>
    db
      .select('post.text', 'post.postavailabilityid')
      .from('post')
      .where('postid', postId),
  addPost: async (insertData) => db('post').insert(insertData),
  updatePost: async (updateData, postId) =>
    db('post').update(updateData).where('postid', '=', postId),
  deletePost: async (postId) =>
    db.from('post').where('postid', postId).delete(),
};

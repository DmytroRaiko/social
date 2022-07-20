const db = require('../db');

module.exports = {
  getComments: async (postId) =>
    db
      .select(
        'Profile.profileId',
        'Profile.name',
        'Profile.avatarLink',
        'Comment.*',
        'parentProfileId',
        'p.name as parentName'
      )
      .from('Comment')
      .join('Profile', 'Profile.profileId', '=', 'Comment.profileId')
      .leftJoin('Profile as p', 'p.profileId', '=', 'Comment.parentProfileId')
      .where('Comment.postId', postId)
      .orderBy('Comment.timeSend', 'DESC'),
  getCommentInfo: async (commentId) =>
    db.select().first().from('Comment').where('commentId', '=', commentId),
  addComment: async (insertData) => db('Comment').insert(insertData),
  updateComment: async (updateData, commentId) =>
    db('Comment').update(updateData).where('commentId', commentId),
  deleteComment: async (commentId) =>
    db
      .from('Comment')
      .where('commentId', commentId)
      .delete(),
};

const db = require('../db');

module.exports = {
  getComments: async (postId) =>
    db
      .select(
        'profile.profileid',
        'profile.name',
        'profile.avatarlink',
        'comment.*',
        'parentProfileId',
        'p.name as parentName'
      )
      .from('comment')
      .join('profile', 'profile.profileid', '=', 'comment.profileid')
      .leftJoin('profile as p', 'p.profileid', '=', 'comment.parentProfileId')
      .where('comment.postid', postId)
      .orderBy('comment.timesend', 'DESC'),
  getCommentInfo: async (commentId) =>
    db.select().first().from('comment').where('commentid', '=', commentId),
  addComment: async (insertData) => db('comment').insert(insertData),
  updateComment: async (updateData, commentId) =>
    db('comment').update(updateData).where('commentid', commentId),
  deleteComment: async (commentId) =>
    db
      .from('comment')
      .where('commentid', commentId)
      .delete(),
};

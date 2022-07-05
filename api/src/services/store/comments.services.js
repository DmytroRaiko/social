const db = require('../db');

module.exports = {
  getComments: async (postId, offset = 0, limit = 30) =>
    db
      .select(
        'profile.profileid',
        'profile.name',
        'profile.avatarlink',
        'comment.*'
      )
      .from('comment')
      .join('profile', 'profile.profileid', '=', 'comment.profileid')
      .where('comment.postid', postId)
      .offset(offset)
      .limit(limit),
  getCommentInfo: async (commentId) =>
    db.select().first().from('comment').where('commentid', '=', commentId),
  addComment: async (insertData) => db('comment').insert(insertData),
  updateComment: async (updateData, commentId) =>
    db('comment').insert(updateData).where('commentid', commentId),
  deleteComment: async (commentId, author) =>
    db
      .from('comment')
      .where('commentid', commentId)
      .andWhere('profileid', author)
      .delete(),
};

const commentServices = require('../../services/store/comments.services');
const postsServices = require('../../services/store/posts.services');

module.exports = (io, socket) => {
  const getComments = async () => {
    const comments = await commentServices.getComments(socket.postId);
    const count = await postsServices.getStatistic(socket.postId);

    io.to(`comments-${socket.postId}`).emit(
      'comments',
      {
        comments,
        count: count?.totalComments || 0,
      }
    );
  };

  const addComment = async (data) => {
    const {
      parentProfileId, postId, profileId, text
    } = data;
    await commentServices.addComment({
      text, parentProfileId, postid: postId, profileid: profileId,
    });
    await postsServices.updatePostAmountComments(postId, '+');

    await getComments();
  };

  const changeComment = async (data) => {
    const { commentId, text } = data;
    await commentServices.updateComment({ text, changed: 1 }, commentId);

    await getComments();
  };

  const deleteComment = async (data) => {
    await commentServices.deleteComment(data);
    await postsServices.updatePostAmountComments(socket.postId, '-');

    await getComments();
  };

  socket.on('comments:get', getComments);
  socket.on('comment:post', addComment);
  socket.on('comment:put', changeComment);
  socket.on('comment:delete', deleteComment);
};

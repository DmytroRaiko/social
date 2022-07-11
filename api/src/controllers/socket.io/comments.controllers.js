const commentServices = require('../../services/store/comments.services');

module.exports = (io, socket) => {
  const getComments = async () => {
    const comments = await commentServices.getComments(socket.postId);

    io.to(`comments-${socket.postId}`).emit('comments', comments);
  };

  const addComment = async (data) => {
    const {
      parentProfileId, postId, profileId, text
    } = data;
    await commentServices.addComment({
      text, parentProfileId, postid: postId, profileid: profileId,
    });

    await getComments();
  };

  const changeComment = async (data) => {
    const { commentId, text } = data;
    await commentServices.updateComment({ text, changed: 1 }, commentId);

    await getComments();
  };

  const deleteComment = async (data) => {
    await commentServices.deleteComment(data);

    await getComments();
  };

  socket.on('comments:get', getComments);
  socket.on('comment:post', addComment);
  socket.on('comment:put', changeComment);
  socket.on('comment:delete', deleteComment);
};

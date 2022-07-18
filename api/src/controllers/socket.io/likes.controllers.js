const likesServices = require('../../services/store/likes.services');
const postsServices = require('../../services/store/posts.services');

module.exports = (io, socket) => {
  const getLikes = async () => {
    const postLikes = await likesServices.getLikes(socket.postId) || null;
    const count = await postsServices.getStatistic(socket.postId);

    io.to(`likes-${socket.postId}`).emit(
      'likes',
      {
        likes: postLikes,
        count: count?.totalLikes || 0,
      }
    );
  };

  const addLike = async (data) => {
    const { userId } = data;
    await likesServices.addLike(socket.postId, userId);
    await postsServices.updatePostAmountLikes(socket.postId, '+');

    await getLikes();
  };

  const deleteLike = async (data) => {
    const { userId } = data;
    await likesServices.deleteLike(socket.postId, userId);
    await postsServices.updatePostAmountLikes(socket.postId, '-');

    await getLikes();
  };

  socket.on('likes:get', getLikes);
  socket.on('likes:post', addLike);
  socket.on('likes:delete', deleteLike);
};

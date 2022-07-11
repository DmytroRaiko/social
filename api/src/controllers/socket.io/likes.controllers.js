const likesServices = require('../../services/store/likes.services');

module.exports = (io, socket) => {
  const getLikes = async () => {
    const postLikes = await likesServices.getLikes(socket.postId) || null;

    io.to(`likes-${socket.postId}`).emit(
      'likes',
      {
        likes: postLikes
      }
    );
  };

  const addLike = async (data) => {
    const { userId } = data;
    await likesServices.addLike({ postid: socket.postId, profileid: userId });

    await getLikes();
  };

  const deleteLike = async (data) => {
    const { userId } = data;
    await likesServices.deleteLike(socket.postId, userId);

    await getLikes();
  };

  socket.on('likes:get', getLikes);
  socket.on('likes:post', addLike);
  socket.on('likes:delete', deleteLike);
};

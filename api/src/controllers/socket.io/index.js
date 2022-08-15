const registerCommentsControllers = require('./comments.controllers');
const registerLikesControllers = require('./likes.controllers');

const socketController = (io, socket) => {
  const { roomId } = socket.handshake.query;

  // eslint-disable-next-line no-param-reassign,prefer-destructuring
  socket.postId = roomId.split('-')[1];
  socket.join(roomId);

  registerCommentsControllers(io, socket);
  registerLikesControllers(io, socket);

  socket.on('disconnect', () => {
    socket.leave(roomId);
  });
};

module.exports = socketController;

const { text, availability } = require('./index');

module.exports = {
  addPost: {
    text: {
      ...text,
      minLength: 1,
      required: true,
    },
    postAvailabilityId: availability,
  },

  editPost: {
    text: {
      ...text,
      minLength: 1,
      required: true,
    },
    postAvailabilityId: availability,
  },
};

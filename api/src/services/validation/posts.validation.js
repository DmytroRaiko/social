const { text, availability } = require('./index');

module.exports = {
  addPost: {
    text: {
      ...text,
      minLength: 1,
      required: true,
    },
    postavailabilityid: availability,
  },

  editPost: {
    text: {
      ...text,
      minLength: 1,
      required: true,
    },
    postavailabilityid: availability,
  },
};

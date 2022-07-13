const { text, availability } = require('./index');

module.exports = {
  addPost: {
    text: {
      ...text,
      minLength: 1,
    },
    postavailabilityid: availability,
  },

  editPost: {
    ...this.addPost
  },
};

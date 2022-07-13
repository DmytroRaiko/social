const { text } = require('./index');

module.exports = {
  addComment: {
    text: {
      required: true,
      ...text,
    },
  },

  editComment: {
    ...this.addComment
  },
};

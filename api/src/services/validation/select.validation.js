const { text } = require('./index');

module.exports = {
  addUniversity: {
    name: {
      ...text,
      required: true,
      maxLength: 80,
      unique: true,
    },
  },
};

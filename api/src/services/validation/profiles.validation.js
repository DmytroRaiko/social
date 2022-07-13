const { profileName, phoneNumber, email } = require('./index');

module.exports = {
  add: {
    name: {
      required: true,
      ...profileName,
    },
    email: {
      required: true,
      unique: true,
      ...email,
    },
    phone: phoneNumber,
  },
  change: {
    name: {
      required: true,
      ...profileName,
    },
    email: {
      required: true,
      unique: true,
      ...email,
    },
    phone: phoneNumber,
  }
};

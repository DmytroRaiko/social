const { profileName, email, password } = require('./index');

module.exports = {
  login: {
    email: {
      required: true,
      ...email,
    },
    password,
  },

  registration: {
    name: {
      profileName,
      required: true,
    },
    email: {
      unique: true,
      required: true,
      ...email,
    },
    password,
    passwordRepeat: {
      repeatValue: 'password',
      ...password,
    },
  },

  forgotPassword: {
    email: {
      email,
      required: true
    },
  },

  resetPassword: {
    password,
    passwordRepeat: {
      repeatValue: 'password',
      ...password,
    },
  }
};

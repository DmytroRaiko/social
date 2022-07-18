const validationConfig = require('./config');

module.exports = {
  email: {
    type: 'string',
    regex: validationConfig.regex.email,
  },
  password: {
    type: 'string',
    required: true,
    minLength: 8,
  },
  profileName: {
    type: 'string',
  },
  text: {
    type: 'string',
  },
  availability: {
    type: 'number',
    required: true,
  },
  phoneNumber: {
    type: 'string',
    regex: validationConfig.regex.phone,
  },
  settingAvailibility: {
    type: 'number',
    oneOf: true,
  }
};

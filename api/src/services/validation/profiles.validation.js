const {
  profileName, phoneNumber, email, settingAvailibility
} = require('./index');

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
    phone: phoneNumber,
    universities: {
      type: 'array',
    },
    emailSettingId: settingAvailibility,
    phoneSettingId: settingAvailibility,
    universitySettingId: settingAvailibility,
  }
};

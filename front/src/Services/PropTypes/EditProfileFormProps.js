const PropTypes = require('prop-types');

module.exports = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    universities: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    emailSettingId: PropTypes.number.isRequired,
    emailSetting: PropTypes.string.isRequired,
    phoneSettingId: PropTypes.number.isRequired,
    phoneSetting: PropTypes.string.isRequired,
    universitySettingId: PropTypes.number.isRequired,
    universitySetting: PropTypes.string.isRequired,
  }).isRequired,
  availabilities: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

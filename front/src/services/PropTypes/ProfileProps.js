const PropTypes = require('prop-types');
const universities = require('./universitiesProps');

module.exports = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  phone: PropTypes.string,
  emailSetting: PropTypes.string.isRequired,
  phoneSetting: PropTypes.string.isRequired,
  universitySetting: PropTypes.string.isRequired,
  ...universities,
};

const PropTypes = require('prop-types');
const universities = require('./universitiesProps');

module.exports = {
  profileid: PropTypes.number.isRequired,
  avatarlink: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  phone: PropTypes.string,
  emailsetting: PropTypes.string.isRequired,
  phonesetting: PropTypes.string.isRequired,
  universitysetting: PropTypes.string.isRequired,
  ...universities,
};

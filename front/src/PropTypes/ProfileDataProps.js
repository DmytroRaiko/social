const PropTypes = require('prop-types');

module.exports = {
  profileData: PropTypes.arrayOf(
    PropTypes.shape({
      profileid: PropTypes.number.isRequired,
      avatarlink: PropTypes.string,
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone: PropTypes.string,
      emailsetting: PropTypes.string.isRequired,
      phonesetting: PropTypes.string.isRequired,
      universitysetting: PropTypes.string.isRequired,
      universities: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          universityid: PropTypes.number.isRequired,
        }),
      ),
    }).isRequired,
  ),
};

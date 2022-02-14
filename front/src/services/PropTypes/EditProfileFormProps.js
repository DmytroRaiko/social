const PropTypes = require('prop-types');

module.exports = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    universities: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    emailsettingid: PropTypes.number.isRequired,
    emailsetting: PropTypes.string.isRequired,
    phonesettingid: PropTypes.number.isRequired,
    phonesetting: PropTypes.string.isRequired,
    universitysettingid: PropTypes.number.isRequired,
    universitysetting: PropTypes.string.isRequired,
  }).isRequired,
  availabilities: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  university: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
};

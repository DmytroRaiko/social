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
    phonesettingid: PropTypes.number.isRequired,
    universitysettingid: PropTypes.number.isRequired,
  }).isRequired,
  availabilities: PropTypes.arrayOf(
    PropTypes.shape({
      availabilityid: PropTypes.number.isRequired,
      availability: PropTypes.string.isRequired,
    }),
  ).isRequired,
  university: PropTypes.arrayOf(
    PropTypes.shape({
      universityid: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};

const PropTypes = require('prop-types');

module.exports = {
  profileData: PropTypes.arrayOf(
    PropTypes?.shape({}).isRequired,
  ),
};

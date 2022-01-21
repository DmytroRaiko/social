const PropTypes = require('prop-types');
const profileProps = require('./ProfileProps');

module.exports = {
  profileData: PropTypes.arrayOf(
    PropTypes?.shape(profileProps).isRequired,
  ),
};

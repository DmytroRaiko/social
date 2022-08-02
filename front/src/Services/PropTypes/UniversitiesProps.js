const PropTypes = require('prop-types');

module.exports = {
  universities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      universityId: PropTypes.number.isRequired,
    }),
  ),
};

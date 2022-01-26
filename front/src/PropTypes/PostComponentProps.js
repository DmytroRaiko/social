const PropTypes = require('prop-types');

module.exports = {
  posts: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ),
  profilePage: PropTypes.bool,
};

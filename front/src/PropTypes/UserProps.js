const PropTypes = require('prop-types');
const profileProps = require('./ProfileProps');

module.exports = {
  user: PropTypes.shape(Object.assign(
    profileProps,
    {
      friends: PropTypes.arrayOf(
        PropTypes.shape(profileProps).isRequired,
      ),
    },
  )),
};

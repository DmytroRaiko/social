const PropTypes = require('prop-types');
const fileProps = require('./FileProps');
const friendProps = require('./FriendProps');
const addressProps = require('./AddressProps');

module.exports = {
  user: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.string,
    avatar: PropTypes.shape({
      file: PropTypes.shape(fileProps).isRequired,
    }),
    files: PropTypes.arrayOf(
      PropTypes.shape(fileProps).isRequired,
    ),
    addrr: PropTypes.shape({
      main: PropTypes.shape(addressProps).isRequired,
      alt: PropTypes.shape(addressProps),
    }),
    friends: PropTypes.arrayOf(
      PropTypes.shape(friendProps).isRequired,
    ),
  }),
};

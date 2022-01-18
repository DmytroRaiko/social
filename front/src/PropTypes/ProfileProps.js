const PropTypes = require('prop-types');
const fileProps = require('./FileProps');
const addressProps = require('./AddressProps');

module.exports = {
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
};

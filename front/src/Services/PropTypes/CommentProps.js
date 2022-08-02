const PropTypes = require('prop-types');

module.exports = {
  onAddComment: PropTypes.func.isRequired,
  props: {
    replyTo: PropTypes.shape({
      profileId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.instanceOf(null),
      ]),
      name: PropTypes.string,
    }),
    replyToHandle: PropTypes.func.isRequired,
    comment: PropTypes.shape({
      commentId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.instanceOf(null),
      ]),
      text: PropTypes.string,
    }),
    handleChange: PropTypes.func.isRequired,
  },
  defaultProps: {
    replyTo: {
      profileId: null,
      name: '',
    },
    comment: {
      commentId: null,
      text: '',
    },
  },
};

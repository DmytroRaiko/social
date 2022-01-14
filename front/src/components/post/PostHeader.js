import PropTypes from 'prop-types';

const PostHeader = ({ headerText }) => <h2>{headerText}</h2>;

PostHeader.propTypes = {
  headerText: PropTypes.string.isRequired,
};

export default PostHeader;

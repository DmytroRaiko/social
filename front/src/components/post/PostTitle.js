import PropTypes from 'prop-types';

const PostTitle = ({ title }) => <h2>{title}</h2>;

PostTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PostTitle;

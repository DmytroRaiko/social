import PropTypes from 'prop-types';

const PostText = ({ postText }) => <p className="post-text">{postText}</p>;

PostText.propTypes = {
  postText: PropTypes.string.isRequired,
};

export default PostText;

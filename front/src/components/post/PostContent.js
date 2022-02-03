import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostContent = ({
  postId, postText,
}) => (
  <Link to={`/article/${postId}`} className="post-content">
    <p className="post-text">{postText}</p>
  </Link>
);

PostContent.propTypes = {
  postId: PropTypes.number.isRequired,
  postText: PropTypes.string.isRequired,
};

export default PostContent;

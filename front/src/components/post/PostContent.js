import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import settings from '../../settings';

const PostContent = ({
  postId, postText, postImage,
}) => (
  <>
    {postImage
      && (
        <div className="post-image">
          <img src={`${settings.URI}/${postImage}`} alt="Post" />
        </div>
      )}
    <Link to={`/article/${postId}`} className="post-content">
      <p className="post-text">{postText}</p>
    </Link>
  </>
);

PostContent.propTypes = {
  postId: PropTypes.number.isRequired,
  postText: PropTypes.string.isRequired,
  postImage: PropTypes.string,
};

PostContent.defaultProps = {
  postImage: null,
};

export default PostContent;

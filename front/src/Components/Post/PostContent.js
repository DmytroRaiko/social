import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import settings from '../../Config';

const PostContent = ({
  postId, postText, postImage,
}) => {
  const params = useParams();
  const { postId: paramId } = params;

  return (
    <>
      {postImage
        && (
          <div className="post-image">
            <img src={`${settings.URI}/files/${postImage}`} alt="Post" />
          </div>
        )}
      {(paramId
        && (
        <div className="post-content">
          <p className="post-text">{postText}</p>
        </div>
        )) || (
        <Link to={`/article/${postId}`} className="post-content">
          <p className="post-text">{postText}</p>
        </Link>
      )}
    </>
  );
};

PostContent.propTypes = {
  postId: PropTypes.number.isRequired,
  postText: PropTypes.string.isRequired,
  postImage: PropTypes.string,
};

PostContent.defaultProps = {
  postImage: null,
};

export default PostContent;

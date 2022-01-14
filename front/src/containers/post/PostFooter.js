import PropTypes from 'prop-types';
import PostAuthor from '../../components/post/PostAuthor';
import PostTime from '../../components/post/PostTime';

const PostFooter = ({ postAuthor = 'Admin', postTime = null }) => (
  <div className="post-footer">
    <PostAuthor author={postAuthor} />
    <PostTime timePost={postTime} />
  </div>
);

PostFooter.propTypes = {
  postAuthor: PropTypes.string,
  postTime: PropTypes.string,
};

PostFooter.defaultProps = {
  postAuthor: 'Admin',
  postTime: null,
};

export default PostFooter;

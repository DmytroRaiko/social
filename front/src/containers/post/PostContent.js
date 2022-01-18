import PropTypes from 'prop-types';
import PostText from '../../components/post/PostText';
import PostImg from '../../components/post/PostImg';
import postImgProps from '../../PropTypes/PostImgProps';
import postImgPropsDefault from '../../PropTypes/PostImgPropsDefault';

const PostContent = ({ postText, postImg }) => (
  <div className="post-content">
    <PostImg postImgSrc={postImg.src} postImgTitle={postImg.title} alt={PostText} />
    <PostText postText={postText} />
  </div>
);

PostContent.propTypes = {
  postText: PropTypes.string.isRequired,
  postImg: PropTypes.shape(postImgProps),
};

PostContent.defaultProps = {
  postImg: postImgPropsDefault,
};

export default PostContent;

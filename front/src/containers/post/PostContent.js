import PropTypes from 'prop-types';
import PostText from '../../components/post/PostText';
import PostImg from '../../components/post/PostImg';
import postImgPropsDefault from '../../PropTypes/PostImgPropsDefault';

const PostContent = ({ postText, postImg }) => (
  <div className="post-content">
    <PostImg postImgSrc={postImg.src} postImgTitle={postImg.title} alt={PostText} />
    <PostText postText={postText} />
  </div>
);

PostContent.propTypes = {
  postText: PropTypes.string.isRequired,
  postImg: PropTypes.shape(
    {
      src: PropTypes.string,
      title: PropTypes.string,
    },
  ),
};

PostContent.defaultProps = {
  postImg: {
    postImgPropsDefault,
  },
};

export default PostContent;
